<?php

namespace Deployer;

require 'recipe/common.php';

// Config
set('repository', 'git@github.com:vnxx/animnya-web.git');
set('git_ssh_command', 'ssh');
set('keep_releases', 2);

add('shared_files', ['.env']);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts
host('prod')
  ->setHostname('153.92.8.177')
  ->setPort(65002)
  ->set('branch', 'main')
  ->set('remote_user', 'u6131667')
  ->set('labels', ['stage' => 'dev'])
  ->set('deploy_path', '/home/u6131667/public_html/animenya.bykevin.work/web');

// Tasks
task('frontend:build', function () {
  runLocally('npm install');

  $apiURL = 'https://animnya.bykevin.work/api';
  $gtagID = 'G-RXQN1KP15B';
  runLocally("ANIMNYA_API_URL=$apiURL GTM_ID=$gtagID npm run build");
});

task('frontend:upload', function () {
  upload(__DIR__ . "/out", '{{release_path}}');
});

task('deploy', [
  'frontend:build',
  'deploy:prepare',
  'frontend:upload',
  'deploy:publish',
]);

after('deploy:failed', 'deploy:unlock');
