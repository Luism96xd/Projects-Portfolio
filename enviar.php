<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $header = 'From: ' . $mail . " \r\n";
    $header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
    $header .= "Mime-Version: 1.0 \r\n";
    $header .= "Content-Type: text/plain";

    $mensaje = "¡Hola! Este mensaje fue enviado por " . $nombre . ",\r\n";
    $mensaje .= "Su e-mail es: " . $mail . " \r\n";
    $mensaje .= "Tiene un mensaje para ti: " . $_POST['mensaje'] . " \r\n";
    $mensaje .= "Enviado el " . date('d/m/Y', time());

    $para = 'chromxd@gmail.com';
    $asunto = 'Mensaje de mi sitio web ('. $name . ')';

mail($para, $asunto, utf8_decode($mensaje), $header);

header("Location:index.html");
?>