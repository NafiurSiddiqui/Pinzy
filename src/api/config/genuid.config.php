<?php

//test

include './config.php';
require 'vendor/autoload.php';

reqRecieveLogger();

use Ramsey\Uuid\Uuid;

$uuid4 = Uuid::uuid4();
// echo $uuid4->toString();

$uuid4String = $uuid4->toString();



filelogger('./uid-check.log', $uuid4String);
