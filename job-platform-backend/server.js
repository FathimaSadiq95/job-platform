require('dotenv').config();

// packages 

const express = require('express');
const cors = require('cors');  //data passing react to express 
const session = require('express-session');  //temporary storage
const bodyParser = require('body-parser');   // data passing through body
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// collections

const login = require('./models/login')
const application = require('./models/application')
const job = require('./models/job')
const provider = require('./models/provider')
const seeker = require('./models/seeker')
const feedback_provider = require('./models/feedback_provider')
const feedback_seeker = require('./models/feedback_seeker')

// express

const port = process.env.PORT || 4000;
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

const providerPendingSearch = new Map();

const uploadDirectory = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });
const upload = multer({
    storage: multer.diskStorage({
        destination: uploadDirectory,
        filename: (req, file, callback) => {
            const extension = path.extname(file.originalname);
            callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
        }
    })
});

const sanitizeImagePath = (value) => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.toLowerCase().includes('fakepath') || trimmed.startsWith('C:\\')) {
        return '';
    }
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads', express.static(uploadDirectory));

app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a secret key of your choice
    resave: false, // Forces the session to be saved back to the store
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: { secure: false } // Set to true if using HTTPS
}));

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connections error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/login', async (req, res) => {
    try {
        const Email = String(req.body?.Email ?? '').trim();
        const Password = String(req.body?.Password ?? '').trim();

        if (!Email || !Password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        const data = await login.findOne({ username: Email, password: Password });

        if (!data) {
            return res.status(401).json({ status: 'not_found', message: 'Invalid username or password' });
        }

        if (!['admin', 'provider', 'seeker'].includes(data.usertype)) {
            return res.status(403).json({
                status: 'not_approved',
                message: 'Your account is pending approval'
            });
        }

        let uid = data._id;

        if (data.usertype === 'provider') {
            const providerData = await provider.findOne({ login_id: data._id });
            uid = providerData ? providerData._id : data._id;
        } else if (data.usertype === 'seeker') {
            const seekerData = await seeker.findOne({ login_id: data._id });
            uid = seekerData ? seekerData._id : data._id;
        } else if (data.usertype === 'admin') {
            uid = data._id;
        }

        return res.status(200).json({ status: 'ok', type: data.usertype, id: data._id, uid });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: 'error', message: 'An error occurred during login' });
    }
});

app.get('/getseekerdata/:id', async (req, res) => {

    const id = req.params.id;
    console.log(id, 'iddddddddddddddd')
    const data = await seeker.findOne({ login_id: id })
    res.status(200).json(data)
})

app.get('/getproviderdata/:id', async (req, res) => {

    const id = req.params.id;
    console.log(id, 'iddddddddddddddd')
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid provider id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const data = await provider.findOne({
        $or: [{ login_id: objectId }, { _id: objectId }]
    });
    // console.log(data, 'dataaaaaaaaaaaaaaa')
    if (!data) {
        return res.status(404).json({ message: 'Provider profile not found' });
    }
    res.status(200).json(data)
})
app.get('/getupdatejob/:id', async (req, res) => {

    const id = req.params.id;
    console.log(id, 'iddddddddddddddd')
    const data = await job.findOne({ _id: id })
    res.status(200).json(data)
})

app.get('/Viewapplication', async (req, res) => {
    const data = await application.aggregate([
        {
            $lookup: { from: 'seekers', localField: 'seekerId', foreignField: '_id', as: 'sdata' }
        },
        {
            $unwind: {
                path: "$sdata",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: { from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'jobdata' }
        },
        {
            $unwind: "$jobdata"
        }

    ])

    // console.log(data)
    res.status(200).json({ status: "ok", data: data })
})

app.get('/Viewapplicationprovider/:uid', async (req, res) => {
    const uid = req.params.uid;
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).json({ status: 'error', message: 'Invalid provider id' });
    }
    const data = await application.aggregate([
        { $lookup: { from: 'seekers', localField: 'seekerId', foreignField: '_id', as: 'sdata' } },
        { $unwind: '$sdata' },
        { $lookup: { from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'jobdata' } },
        { $unwind: '$jobdata' },
        { $match: { status: 'pending', 'jobdata.provider_id': new mongoose.Types.ObjectId(uid) } }
    ]);
    res.status(200).json({ status: 'ok', data });
});

app.get('/ViewApprovedJob', async (req, res) => {
    const data = await job.aggregate([
        {
            $lookup: { from: 'providers', localField: 'provider_id', foreignField: '_id', as: 'jobdata' }
        },
        { $unwind: '$jobdata' },
        { $match: { 'status': 'approve' } }
    ])
    // console.log(data);
    res.status(200).json({ status: "ok", data: data })
})


app.get('/Viewapprovedprovider', async (req, res) => {
    const data = await provider.aggregate([
        {
            $lookup:
            {
                from: 'logins',
                localField: 'login_id',
                foreignField: '_id',
                as: 'logdata'
            }
        },
        {
            $unwind: {
                path: "$logdata",
                preserveNullAndEmptyArrays: true
            }
        },
        { $match: { 'logdata.usertype': 'provider' } }

    ])
    // console.log('data', data)
    res.status(200).json({ status: "ok", data: data })
})

app.get('/Viewapprovedseeker', async (req, res) => {
    const data = await seeker.aggregate([
        {
            $lookup:
                { from: 'logins', localField: 'login_id', foreignField: '_id', as: 'logindata' }
        },
        { $unwind: '$logindata' },
        { $match: { 'logindata.usertype': 'seeker' } }

    ])
    // console.log(data, 'ioioi')
    res.status(200).json({ status: "ok", data: data })
})


app.get('/Viewfeedbackprovider', async (req, res) => {
    try {
        const data = await feedback_provider.aggregate([
            {
                $lookup: {
                    from: 'providers',
                    localField: 'provider_id',
                    foreignField: '_id',
                    as: 'pdata'
                }
            },
            {
                $unwind: {
                    path: '$pdata',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        return res.status(200).json({ status: 'ok', data });
    } catch (error) {
        console.error('Error loading provider feedback:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to load provider feedback'
        });
    }
});

app.get('/Viewfeedbackseeker', async (req, res) => {
    const data = await feedback_seeker.aggregate([
        { $lookup: { from: 'seekers', localField: 'seeker_id', foreignField: '_id', as: 'sdata' } },
        { $unwind: '$sdata' }])
    // console.log(data)
    res.status(200).json({ status: "ok", data: data })
})

app.get('/Viewalljobs', async (req, res) => {
    const data = await job.find().sort({ _id: -1 });
    res.status(200).json({ status: "ok", data });
})

app.get('/Viewpendingjobs', async (req, res) => {
    const data = await job.find({ status: 'pending' }).sort({ _id: -1 });
    res.status(200).json({ status: "ok", data });
})

app.get('/Viewprovider', async (req, res) => {
    const data = await provider.aggregate([
        {
            $lookup: {

                from: 'logins',
                localField: 'login_id',
                foreignField: '_id',
                as: 'logindata'
            }
        },
        { $unwind: '$logindata' },
        { $match: { 'logindata.usertype': 'pending' } }
    ])

    res.status(200).json({ status: "ok", data: data })
})

app.get('/Viewseeker', async (req, res) => {
    const data = await seeker.aggregate([
        {
            $lookup:
                { from: 'logins', localField: 'login_id', foreignField: '_id', as: 'logindata' }
        },
        { $unwind: '$logindata' },
        { $match: { 'logindata.usertype': 'pending' } }
    ])
    res.status(200).json({ status: "ok", data: data })
    console.log(data, 'seeker data')
})

app.post('/profile', async (req, res) => {
    const { name, position, profile_photo, organisation, aboutorganisation, email, phone } = req.body;
    const data = await provider({
        name: name,
        position: position,
        profile_photo: sanitizeImagePath(profile_photo),
        organisation: organisation,
        aboutorganisation: aboutorganisation,
        email: email,
        phone: phone
    });
    await data.save();
    res.status(200).json({ status: "ok" })
})

app.post('/Sendfeedback/:uid', async (req, res) => {
    const { feedback } = req.body;
    const uid = req.params.uid;
    const newpid = new ObjectId(uid);
    const { feed_back, date, provider_id } = req.body;
    const data = await feedback_provider({ feed_back: feedback, date: new Date(), provider_id: newpid });
    await data.save();
    res.status(200).json({ status: "ok" })
})

app.post('/Sendregisterjob/:id', async (req, res) => {
    try {
        const { post, about, requirements, exp_required, provider_id, from_date, due_date, salary, status, no_of_vacancies, jobtype } = req.body;
        const providerId = req.params.id;
        //const seekerId = req.params.uid;
        // const newpid = new ObjectId(providerId);
        const data = await job({
            post, about,
            requirements, exp_required, provider_id: providerId,
            from_date, due_date, salary: '0', status: 'pending',
            no_of_vacancies, jobtype
        });
        await data.save();
        console.log('Job Registered Successfully!!');
    }
    catch (error) {
        console.error('Cannot register Job', error)
    }
    res.status(200).json({ status: "ok" })
})

app.post('/Sendregisterprovider', upload.fields([
    { name: 'profile_photo', maxCount: 1 },
    { name: 'images', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, post, organization, about_you, about_org, address, location, website, email, phone, password, confirm_password } = req.body;
        const profilePhoto = req.files?.profile_photo?.[0];
        const providerImages = req.files?.images?.[0];
        const log = await login({ username: email, password: confirm_password, usertype: 'pending' });
        await log.save();
        console.log(log._id);
        const data = await provider({
            name,
            position: post,
            images: providerImages ? `/uploads/${providerImages.filename}` : '',
            location,
            website,
            date: new Date(),
            organisation: organization,
            aboutorganisation: about_org,
            email,
            aboutyou: about_you,
            profile_photo: profilePhoto ? `/uploads/${profilePhoto.filename}` : '',
            phone,
            login_id: log._id,
            address
        });
        await data.save();
        console.log('User Registered Successfully!!');
    }
    catch (error) {
        console.error('Cannot register User', error)
    }
    res.status(200).json({ status: "ok" })
})

app.post('/Sendupdateprovider/:id', upload.fields([
    { name: 'profile_photo', maxCount: 1 },
    { name: 'images', maxCount: 1 }
]), async (req, res) => {
    const id = req.params.id;
    const existingProvider = await provider.findById(id);
    const profilePhoto = req.files?.profile_photo?.[0];
    const companyImage = req.files?.images?.[0];

    const updateData = {
        name: req.body.name,
        position: req.body.position,
        organisation: req.body.organisation,
        aboutorganisation: req.body.aboutorganisation,
        aboutyou: req.body.aboutyou,
        location: req.body.location,
        website: req.body.website,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
    };

    if (profilePhoto) {
        updateData.profile_photo = `/uploads/${profilePhoto.filename}`;
    } else if (req.body.profile_photo && req.body.profile_photo !== 'undefined') {
        updateData.profile_photo = sanitizeImagePath(req.body.profile_photo);
    } else if (existingProvider) {
        updateData.profile_photo = existingProvider.profile_photo;
    }

    if (companyImage) {
        updateData.images = `/uploads/${companyImage.filename}`;
    } else if (req.body.images && req.body.images !== 'undefined') {
        updateData.images = sanitizeImagePath(req.body.images);
    } else if (existingProvider) {
        updateData.images = existingProvider.images;
    }

    await provider.findByIdAndUpdate(id, updateData);

    res.status(200).json({ status: "ok" });
});

app.post('/Updatejob/:id', async (req, res) => {
    const { post, about, requirements, exp_required, from_date, due_date, salary, no_of_vacancies } = req.body;
    const id = req.params.id;

    await job.findByIdAndUpdate(id, {
        post,
        about,
        requirements,
        exp_required,
        from_date,
        due_date,
        salary,
        no_of_vacancies
    });

    res.status(200).json({ status: "ok" });
});

app.get('/Viewapplicationprovider', async (req, res) => {
    const data = await application.aggregate([
        {
            $lookup: {
                from: 'seekers',
                localField: 'seeker_id',
                foreignField: '_id',
                as: 'sdata'
            }
        },
        {
            $unwind: '$sbdata'

        },

        {
            $lookup: { from: 'jobs', localField: ' jobId', foreignField: '_id', as: 'jobdata' }
        },
        {
            $unwind: '$jobdata'
        }

    ])
    res.status(200).json({ status: "ok" })
})

app.get('/ViewjobAdmin', async (req, res) => {
    const data = await job.aggregate([
        {
            $lookup: { from: 'providers', localField: 'provider_id', foreignField: '_id', as: 'pdata' }
        },
        { $unwind: '$pdata' },
        { $match: { 'status': 'pending' } }
    ])
    console.log(data)
    res.status(200).json({ status: "ok", data: data })
})

app.get('/Viewselectedlist', async (req, res) => {
    const data = await seeker.aggregate([
        { $lookup: { from: 'logins', localField: 'login_id', foreignField: '_id', as: 'sdata' } },
        { $unwind: '$sdata' }])
    res.status(200).json({ status: "pathuuuu", data: data })

})

app.get('/Viewselectedapplications/:uid', async (req, res) => {
    const uid = req.params.uid;
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).json({ status: 'error', message: 'Invalid provider id' });
    }
    const data = await application.aggregate([
        { $lookup: { from: 'seekers', localField: 'seekerId', foreignField: '_id', as: 'sdata' } },
        { $unwind: '$sdata' },
        { $lookup: { from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'jobdata' } },
        { $unwind: '$jobdata' },
        { $match: { status: { $in: ['CONGRATULATION', 'CONGRATULATIONS', 'CONGRTAGULATIONS'] }, 'jobdata.provider_id': new mongoose.Types.ObjectId(uid) } }
    ]);
    res.status(200).json({ status: "ok", data: data });
    console.log(data, 'selected applications');
});


app.post('/Sendfeedbackseeker/:uid', async (req, res) => {

    console.log('heyyyyyy', req.body)
    const { feedback } = req.body;
    const uid = req.params.uid;
    const newsid = new ObjectId(uid);
    const { seeker_id, feed_back, date } = req.body;
    const data = await feedback_seeker({ seeker_id: newsid, feed_back: feedback, date: new Date() });
    await data.save();
    res.status(200).json({ status: "ok" })
})

app.post('/Sendregisterseeker', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, DOB, link, about, email, phone, password, confirm_password, jobtype ,location } = req.body;
        const photo = req.files?.photo?.[0];
        const cv = req.files?.cv?.[0];
        const log = await login({ username: email, password: confirm_password, usertype: 'pending' });
        await log.save();
        console.log(log._id);
        const data = await seeker({
            name,
            cv: cv ? `/uploads/${cv.filename}` : '',
            link,
            email,
            date: new Date(),
            dateofbirth: DOB,
            profilephoto: photo ? `/uploads/${photo.filename}` : '',
            about,
            qualification: req.body.qualification || '',
            skills: req.body.skills || '',
            experience: req.body.experience || '',
            phone,
            jobtype: jobtype || 'Any',
            location: req.body.location || '',
            login_id: log._id
        });
        await data.save();
        console.log('User Registered Successfully!!');
    }
    catch (error) {
        console.error('Cannot register User', error)
    }
    res.status(200).json({ status: "ok" })
})

app.post('/Updateregisterseeker', async (req, res) => {
    try {
        const { login_id, name, dateofbirth, cv, profilephoto, link, about, email, phone, qualification, skills, experience, jobtype ,location } = req.body;

        if (!login_id) {
            return res.status(400).json({ status: "error", message: "login_id is required" });
        }

        const updatedSeeker = await seeker.findOneAndUpdate(
            { login_id },
            { name, dateofbirth, cv, profilephoto, link, about, qualification, skills, experience, email, phone, jobtype , location },
            { new: true, runValidators: true }
        );

        if (!updatedSeeker) {
            return res.status(404).json({ status: "error", message: "Seeker not found" });
        }

        res.status(200).json({ status: "ok", data: updatedSeeker });
    } catch (error) {
        console.error('Cannot update seeker', error);
        res.status(500).json({ status: "error", message: "Cannot update seeker" });
    }
})

app.get('/Viewapplicationseeker/:uid', async (req, res) => {
    const { uid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).json({ status: 'error', message: 'Invalid seeker id' });
    }

    const requestedId = new mongoose.Types.ObjectId(uid);
    const seekerRecord = await seeker.findOne({
        $or: [
            { _id: requestedId },
            { login_id: requestedId }
        ]
    }).select('_id');

    if (!seekerRecord) {
        return res.status(404).json({ status: 'error', message: 'Seeker not found' });
    }

    const data = await application.aggregate([
        {
            $match: {
                $or: [
                    { seekerId: seekerRecord._id },
                    { seekerId: String(seekerRecord._id) },
                    { seekerId: uid }
                ]
            }
        },
        {
            $lookup: { from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'jobdata' }
        },
        {
            $unwind: {
                path: '$jobdata',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: { from: 'providers', localField: 'jobdata.provider_id', foreignField: '_id', as: 'pdata' }
        },
        {
            $unwind: {
                path: '$pdata',
                preserveNullAndEmptyArrays: true
            }
        },

    ])
    console.log(data)
    res.status(200).json({ status: "ok", data: data })
})

app.get('/Viewapplicationselectedseeker', (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.get('/Viewjobseeker/:uid', async (req, res) => {
    const uid = req.params.uid;
    const applications = await application.find({ seekerId: new ObjectId(uid) });
    const jobIds = applications.map(app => app.jobId);
    console.log('Job IDs:', jobIds);


    const data = await job.aggregate([
        {
            $lookup: { from: 'providers', localField: 'provider_id', foreignField: '_id', as: 'pdata' }
        },
        { $unwind: '$pdata' },
        { $match: { status: 'approve' } }
    ])
    const jobsWithApplicationStatus = data.map((currentJob) => ({
        ...currentJob,
        isApplied: jobIds.some((jobId) => jobId.toString() === currentJob._id.toString())
    }));
    res.status(200).json({ status: "ok", data: jobsWithApplicationStatus })
})
app.get('/Viewfeedback', async (req, res) => {
    const data = await feedback_provider.aggregate([
        { $lookup: { from: 'providers', localField: 'provider_id', foreignField: '_id', as: 'pdata' } },
        { $unwind: '$pdata' }])
    console.log(data)
    res.status(200).json({ status: "ok" })
})
app.get('/approveProvider/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id, 'fgfhfhfhfh')
    await login.findByIdAndUpdate(id, { usertype: 'provider' })
    res.status(200).json({ 'status': 'ok' })
})
app.get('/rejectProvider/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await login.findByIdAndUpdate(id, { usertype: 'reject' })
    res.status(200).json({ 'status': 'ok' })
})
app.get('/approveSeeker/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await login.findByIdAndUpdate(id, { usertype: 'seeker' })
    res.status(200).json({ 'status': 'ok' })
})
app.get('/rejectSeeker/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await login.findByIdAndUpdate(id, { usertype: 'reject' })
    res.status(200).json({ 'status': 'ok' })
})
app.get('/approveJob/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await job.findByIdAndUpdate(id, { status: 'approve' })
    res.status(200).json({ 'status': 'ok' })
})
app.get('/rejectJob/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await job.findByIdAndUpdate(id, { status: 'reject' })
    res.status(200).json({ 'status': 'ok' })
})
app.get('/selectApplication/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id, 'fgfhfhfhfh')
    const updatedApplication = await application.findByIdAndUpdate(
        id,
        { status: 'CONGRATULATION' },
        { new: true }
    );
    res.status(200).json({ status: 'ok', application: updatedApplication })
})
app.get('/rejectApplication/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id, 'fgfhfhfhfh')
    await application.findByIdAndUpdate(id, { status: 'SORRY' })
    res.status(200).json({ 'status': 'ok' })
})


app.get('/Deletejob/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await job.findByIdAndDelete(id)
    res.status(200).json({ 'status': 'ok' })
})

app.get('/applyForJob/:id/:uid', async (req, res) => {
    try {
        const id = req.params.id;
        const uid = req.params.uid;
        const newsid = new ObjectId(uid);
        const newjobid = new ObjectId(id);

        const existingApplication = await application.findOne({ jobId: newjobid, seekerId: newsid });
        if (existingApplication) {
            return res.status(409).json({ status: 'already_applied', message: 'You have already applied for this job' });
        }

        const data = await application({ jobId: newjobid, status: 'pending', date: new Date(), seekerId: newsid });
        await data.save();
        console.log('Applied for job successfully!!');
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ status: 'error', message: 'Failed to apply for job' });
    }
});

// AI Career Assistant
app.post('/api/chat', async (req, res) => {

    try {

        const { message, uid, userType } = req.body;
        if (userType === "provider" && providerPendingSearch.has(uid)) {

            const jobKeyword = message
                .toLowerCase()
                .replace(/[?!.]/g, "")
                .trim();

            providerPendingSearch.delete(uid);

            const candidateResponse = await fetch(
                `http://127.0.0.1:4000/api/ai/candidates?job=${encodeURIComponent(jobKeyword)}`
            );

            const candidateData = await candidateResponse.json();

            console.log("AI candidate search result:", candidateData);

            if (candidateData.count > 0) {

                return res.json({
                    response: `I found ${candidateData.count} suitable candidate${candidateData.count === 1 ? '' : 's'} for a ${jobKeyword} position. Please use the Search option to view ${candidateData.count === 1 ? 'their profile' : 'their profiles'}.`,
                    intent: "candidate"
                });

            }

            return res.json({
                response: `I couldn't find any suitable candidates for a ${jobKeyword} position at the moment.`,
                intent: "candidate"
            });
        }

        console.log("Chat request:", {
            message,
            uid,
            userType
        });

        const response = await fetch('https://job-platform-bxrj.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        console.log("Python AI response:", data);

        // SEEKER → ACTUAL JOB SEARCH
        if (userType === "seeker" && data.intent === "job") {

            const jobResponse = await fetch(
                'http://127.0.0.1:4000/api/ai/jobs'
            );

            const jobData = await jobResponse.json();

            console.log("AI job search result:", jobData);

            if (jobData.jobs && jobData.jobs.length > 0) {

                const jobList = jobData.jobs.map((job) => {
                    return `${job.post} at ${job.organisation}, ${job.location}.`;
                }).join(" ");

                return res.json({
                    response: `Here are the available jobs on our platform: ${jobList}`,
                    intent: "job"
                });
            }

            return res.json({
                response: "There are currently no approved job opportunities available.",
                intent: "job"
            });
        }
        // PROVIDER → CANDIDATE SEARCH
        if (userType === "provider" && data.intent === "candidate") {

            const messageLower = message.toLowerCase();

            const jobKeywords = [
                "mern",
                "react",
                "python",
                "java",
                "laravel",
                "frontend",
                "backend",
                "web developer",
                "software developer",
                "data analyst",
                "data analytics",
                "accountant"
            ];

            let jobKeyword = "";
            if (!jobKeyword) {
                providerPendingSearch.set(uid, true);
                return res.json({
                    response: "Sure! Which position are you hiring for?",
                    intent: "candidate"
                });
            }

            for (const keyword of jobKeywords) {
                if (messageLower.includes(keyword)) {
                    jobKeyword = keyword;
                    break;
                }
            }
            const candidateResponse = await fetch(
                `http://127.0.0.1:4000/api/ai/candidates?job=${encodeURIComponent(jobKeyword)}`
            );

            const candidateData = await candidateResponse.json();

            console.log("AI candidate search result:", candidateData);

            if (candidateData.count > 0) {

                return res.json({
                    response: `I found ${candidateData.count} suitable candidate(s) for ${jobKeyword}. Please use the Search option to view their complete profiles.`,
                    intent: "candidate"
                });

            }

            return res.json({
                response: `I found ${candidateData.count} suitable candidate${candidateData.count === 1 ? '' : 's'} for a ${jobKeyword} position. Please use the Search option to view ${candidateData.count === 1 ? 'their profile' : 'their profiles'}.`,
                intent: "candidate"
            });
        }

        // Everyone else gets the normal AI response
        res.status(response.status).json(data);

    } catch (error) {

        console.error('Chatbot connection error:', error);

        res.status(500).json({
            error: 'Could not connect to AI Career Assistant'
        });
    }
});
app.get('/api/ai/candidates', async (req, res) => {
    try {

        const job = req.query.job || '';

        const searchRegex = new RegExp(job, 'i');

        const data = await seeker.aggregate([
            {
                $lookup: {
                    from: 'logins',
                    localField: 'login_id',
                    foreignField: '_id',
                    as: 'logindata'
                }
            },
            {
                $unwind: '$logindata'
            },
            {
                $match: {
                    'logindata.usertype': 'seeker',
                    $or: [
                        { qualification: searchRegex },
                        { skills: searchRegex },
                        { experience: searchRegex },
                        { about: searchRegex }
                    ]
                }
            }
        ]);

        const candidates = data.map((item) => ({
            qualification: item.qualification || '',
            skills: item.skills || '',
            experience: item.experience || ''
        }));

        res.status(200).json({
            status: 'ok',
            count: candidates.length,
            candidates: candidates
        });

    } catch (error) {

        console.error('Error searching AI candidates:', error);

        res.status(500).json({
            status: 'error',
            message: 'Unable to search candidates'
        });
    }
});

app.get('/api/ai/jobs', async (req, res) => {
    try {

        const today = new Date().toISOString().split('T')[0];

        const data = await job.aggregate([
            {
                $lookup: {
                    from: 'providers',
                    localField: 'provider_id',
                    foreignField: '_id',
                    as: 'jobdata'
                }
            },

            { $unwind: '$jobdata' },

            {
                $match: {
                    status: 'approve',
                    due_date: { $gte: today }
                }
            }
        ]);

        const jobs = data.map((item) => ({
            post: item.post,
            organisation: item.jobdata?.organisation || '',
            location: item.jobdata?.location || '',
            vacancies: item.no_of_vacancies ?? item.no_of_positions ?? 0,
            requirements: item.requirements || '',
            experience: item.exp_required || '',
            from_date: item.from_date || '',
            due_date: item.due_date || ''
        }));

        res.status(200).json({
            status: 'ok',
            jobs: jobs
        });

    } catch (error) {

        console.error('Error fetching AI job data:', error);

        res.status(500).json({
            status: 'error',
            message: 'Unable to fetch job data'
        });
    }
});

// Search button 
app.get('/api/search-jobs', async (req, res) => {
    try {
        const { keyword = '', region = 'Anywhere', jobType = 'Any' } = req.query;

        const searchKeyword = keyword.trim();
        const searchRegion = region.trim();
        const searchJobType = jobType.trim();

        const matchConditions = {
            status: 'approve'
        };

        // Search Job Title OR Company Name
        if (searchKeyword) {
            const normalizedKeyword = searchKeyword
                .toLowerCase()
                .replace(/\bdevelopment\b/g, 'developer')
                .replace(/\bdevelopers\b/g, 'developer')
                .trim();

            const keywordRegex = new RegExp(normalizedKeyword, 'i');

            matchConditions.$or = [
                { post: keywordRegex },
                { 'jobdata.organisation': keywordRegex }
            ];
        }

        // Search Region
        if (searchRegion && searchRegion.toLowerCase() !== 'anywhere') {
            matchConditions['jobdata.location'] = new RegExp(searchRegion, 'i');
        }

        // Search Job Type
        if (searchJobType && searchJobType.toLowerCase() !== 'any') {
            matchConditions.job_type = searchJobType;
        }

        const data = await job.aggregate([
            {
                $lookup: {
                    from: 'providers',
                    localField: 'provider_id',
                    foreignField: '_id',
                    as: 'jobdata'
                }
            },
            {
                $unwind: '$jobdata'
            },
            {
                $match: matchConditions
            }
        ]);

        console.log('Search:', {
            keyword: searchKeyword,
            region: searchRegion,
            jobType: searchJobType,
            results: data.length
        });

        res.status(200).json({
            status: 'ok',
            data: data
        });

    } catch (error) {
        console.error('Job search error:', error);

        res.status(500).json({
            status: 'error',
            message: 'Unable to search jobs'
        });
    }
});

app.get('/api/search-candidates', async (req, res) => {
    try {
        const {
            keyword = '',
            region = 'Anywhere',
            jobType = 'Any'
        } = req.query;

        const searchKeyword = keyword.trim();
        const searchRegion = region.trim();
        const searchJobType = jobType.trim();

        const matchConditions = {
            'logindata.usertype': 'seeker'
        };

        // Qualification / Skills search
        if (searchKeyword) {
            const keywordRegex = new RegExp(searchKeyword, 'i');

            matchConditions.$or = [
                { qualification: keywordRegex },
                { skills: keywordRegex },
                { experience: keywordRegex },
                { about: keywordRegex }
            ];
        }

        // Location filter
        if (
            searchRegion &&
            searchRegion.toLowerCase() !== 'anywhere'
        ) {
            matchConditions.location = new RegExp(searchRegion, 'i');
        }

        // Preferred job type filter
        if (
            searchJobType &&
            searchJobType.toLowerCase() !== 'any'
        ) {
            matchConditions.jobtype = searchJobType;
        }

        const data = await seeker.aggregate([
            {
                $lookup: {
                    from: 'logins',
                    localField: 'login_id',
                    foreignField: '_id',
                    as: 'logindata'
                }
            },
            {
                $unwind: '$logindata'
            },
            {
                $match: matchConditions
            }
        ]);

        console.log('Candidate Search:', {
            keyword: searchKeyword,
            region: searchRegion,
            jobType: searchJobType,
            results: data.length
        });

        const candidates = data.map((item) => ({
            _id: item._id,
            name: item.name,
            qualification: item.qualification || '',
            skills: item.skills || '',
            experience: item.experience || '',
            about: item.about || '',
            location: item.location || '',
            jobtype: item.jobtype || 'Any',
            profilephoto: item.profilephoto || ''
        }));

        res.status(200).json({
            status: 'ok',
            data: candidates
        });

    } catch (error) {
        console.error('Candidate search error:', error);
        console.log("Candidate results:", response.data.data);
        res.status(500).json({
            status: 'error',
            message: 'Unable to search candidates'
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});




