// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel

/*
 * Developed for Anunzio International by Anzul Aqeel
 * Contact +971545822608 or +971585515742
 */

const core = require('@actions/core');
const github = require('@actions/github');
const minimatch = require('minimatch');
const fs = require('fs');

async function run() {
    try {
        const token = core.getInput('token');
        const configPath = core.getInput('config');

        if (!fs.existsSync(configPath)) {
            core.setFailed(`Configuration file not found at ${configPath}`);
            return;
        }

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const octokit = github.getOctokit(token);
        const { owner, repo, number } = github.context.issue;

        if (!number) {
            console.log('Not a pull request context. Skipping.');
            return;
        }

        console.log(`Fetching changed files for PR #${number}...`);

        // Get list of changed files
        const { data: files } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: number,
            per_page: 100 // Handle pagination in real apps
        });

        const changedFileNames = files.map(f => f.filename);
        const labelsToAdd = new Set();

        // Check against config
        for (const [label, patterns] of Object.entries(config)) {
            for (const pattern of patterns) {
                if (changedFileNames.some(filename => minimatch(filename, pattern))) {
                    labelsToAdd.add(label);
                    break; // Found a match for this label, move to next label
                }
            }
        }

        if (labelsToAdd.size > 0) {
            const labels = Array.from(labelsToAdd);
            console.log(`Adding labels: ${labels.join(', ')}`);
            await octokit.rest.issues.addLabels({
                owner,
                repo,
                issue_number: number,
                labels: labels
            });
        } else {
            console.log('No matching labels found.');
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel
