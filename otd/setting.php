<?php

/* Zusätzliche Einstellungen */

	$pucheck		= 'false';	/* Für Panel Update Prüfung auf true setzen */
	$elcheck		= 'false';	/* Für Entwickler Notfall Abschaltungsprüfung auf true setzen */

/*
Datenschutzhinweiß für Funktion $pucheck und $elcheck:
	Für die Emergency Lock- und Update Prüfung stellt euer Server eine Verbindung zum Datenbank Server unter 136.243.88.171 her.
	Dabei wird eure Server IP übertragen !
	Diese Informationen werden in der Regel nicht gespeichert.
	Sollte aus technisch notwendigen Gründen eine Speicherung erfolgen, wird diese nach max. 48 Stunden gelöscht.
	Eine Weitergabe bzw. eine weitere Verarbeitung erfolgt durch 136.243.88.171 nicht.
*/

/*	Block Aktivierung	*/

	$block_service 		= 'true';
	$block_teamspeak 	= 'true';
	$block_sysctl		 	= 'true'; // Keine Funktion gegenwärtig, Platzhalter / Dev
	$block_smart	 		= 'false';
	$block_raid	 			= 'false';

/*	>>Service Status Konfiguration<<	*/

  $tcpserver   		= '127.0.0.1';

  $tcpdienste  		= array('FTP', 'SSH', 'SMTP', 'HTTP', 'POP3', 'HTTPS', 'MySQL');

  $tcpports  		= array('21', '22', '25', '80', '110', '443', '3306');

/*	>>TeamSpeak3 Konfiguration<<	*/

  $tsserver   		= array('136.243.96.238');

  $tsquery  		= array('10011');

  $tsport  		= array('9987');

	$tsuser			= array('serveradmin');

	$tspass			= array('gBxKNjMV');

?>
