<?php

if (
    isset($_POST['predmet_d']) && isset($_POST['katedra'])
    && isset($_POST['sala']) && isset($_POST['datum'])
) {
    $prijava = new Prijava(null, $_POST['predmet_d'], $_POST['katedra'], $_POST['sala'], $_POST['datum']);
    $status = Prijava::add($prijava, $conn);
    if ($status) {
        echo Prijava::getLastId($conn);
    } else {
        echo $status;
        echo 'Failed';
    }
}
