const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission and generate dynamic profile card
app.post('/generate', (req, res) => {
    const { name, bio, skills, socialLink } = req.body;

    // Process skills string into an array
    const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : [];
    const skillsHtml = skillsArray.map(skill => `<span class="skill-tag">${skill}</span>`).join('');

    // Dynamic HTML response generated on the server
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}'s Profile Card</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="profile-card">
                <div class="avatar-container">
                    <div class="avatar-placeholder">${name ? name.charAt(0).toUpperCase() : 'U'}</div>
                </div>
                <h2>${name}</h2>
                <p class="bio">${bio}</p>
                <div class="skills-section">
                    <h3>Skills</h3>
                    <div class="skills-list">
                        ${skillsHtml}
                    </div>
                </div>
                <div class="social-section">
                    <a href="${socialLink}" target="_blank" class="btn-social">Connect / Portfolio</a>
                </div>
                <br>
                <a href="/" class="btn-back">← Create Another Card</a>
            </div>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});