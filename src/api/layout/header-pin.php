<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="shortcut icon" type="image/png" href="../assets/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin="" />

        <link rel="stylesheet" href="../style/fontawesome/all.min.css">
        <link rel="stylesheet" href="../style/fontawesome/fontawesome.min.css">

        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>
        <link rel="stylesheet" href="../../dist/output.css" />
        <link rel="stylesheet" href="../style/leaflet.css">
        <script type="module" src="../js/controller.class.js"></script>
        <title>Pinzy -
            <?php
            echo !empty($pageTitle) ? $pageTitle : 'Pin aware the world.'
            ?>
        </title>
    </head>

    <body class="flex justify-center items-center bg-zinc-50 desktop-md:border-2 desktop-md:border-zinc-300 ">

        <div
            class="content-wrapper flex justify-center items-center relative w-full desktop-md:w-4/5 desktop-md:py-4 desktop-md:px-8 desktop:rounded-md">
            <!-- sidebar -->
            <aside
                class="absolute left-0 sidebar -bottom-full transition-all w-full  duration-700 z-30 inw-full border-2 border-zinc-400 tablet:top-0 tablet:relative tablet:bg-aside laptop:w-[30rem] desktop-md:rounded-l-lg bg-zinc-500">

                <div class="sidebar-content-wrapper  h-screen tablet:opacity-100 bg-zinc-500 transition-all duration-500
                    ">
