import * as github from '@actions/github';
import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', { required: true });

    const [owner, repo] = core.getInput('repo').split('/');
    const title = core.getInput('title', { required: true });
    const body = core.getInput('body');
    const labels = core
      .getInput('labels')
      .split('\n')
      .filter(l => l !== '');
    const milestone = Number(core.getInput('milestone'));
    const assignees = core
      .getInput('assignees')
      .split('\n')
      .filter(a => a !== '');

    const client = github.getOctokit(githubToken);
    await client.issues.create({
      owner: owner,
      repo: repo,
      title: title,
      body: body,
      labels: labels,
      milestone: milestone ? milestone : undefined,
      assignees: assignees
    });
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
}

run();
