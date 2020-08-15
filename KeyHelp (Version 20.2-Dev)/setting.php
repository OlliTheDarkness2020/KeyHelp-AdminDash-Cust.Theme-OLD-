<?php

/* Zusätzliche Einstellungen */

	$pucheck	= 'false';	/* Für Panel Update Prüfung auf true setzen */
	$elcheck	= 'false';	/* Für Entwickler Notfall Abschaltungsprüfung auf true setzen */

/*
Datenschutzhinweiß für Funktion $pucheck und $elcheck:
	Für die Emergency Lock- und Update Prüfung stellt euer Server eine Verbindung zum Datenbank Server unter 136.243.88.171 her.
	Dabei wird eure Server IP übertragen !
	Diese Informationen werden in der Regel nicht gespeichert.
	Sollte aus technisch notwendigen Gründen eine Speicherung erfolgen, wird diese nach max. 48 Stunden gelöscht.
	Eine Weitergabe bzw. eine weitere Verarbeitung erfolgt durch 136.243.88.171 nicht.
!! ACHTUNG !!
	Für diese Funktionen (pucheck & elcheck) benötigen Sie Zugangsdaten.
	Um diese zu erhalten , wenden Sie sich per PM im KeyHelp an OlliTheDarkness
*/

/*	Custom Block Anzeige Aktivierung (true)	/ Deaktivierung (false) */

	$block_service 		= 'true';		// Service / Port Status
	$block_teamspeak 	= 'false';		// TeamSpeak Status
	$block_smart	 	= 'false';		// S.M.A.R.T Status - NUR BEI ROOT- NICHT BEI VSERVERN MÖGLICH
	$block_raid	 	= 'false';		// RAID Status - NUR BEI ROOT- NICHT BEI VSERVERN MÖGLICH
	$block_diskspace	= 'true';		// Speicherplatz Status
	$block_temperatur	= 'true';		// Temperatur Status - NUR BEI ROOT- NICHT BEI VSERVERN MÖGLICH
	$block_mailgraph	= 'true';		// MailGraph Status

/*	KeyHelp Block Anzeige Aktivierung (true) / Deaktivierung (false) */

	$block_news 		= 'true';		// News Block
	$block_notes 		= 'true';		// Notiz Block
	$block_applications	= 'true';		// Anwendungen Block
	$block_resources	= 'true';		// Ressourcen Block
	$block_server		= 'true';		// Server Block

/*	>>Service Status Konfiguration<<	*/

	$tcpserver   	= '127.0.0.1';
	$tcpdienste  	= array('FTP', 'SSH', 'SMTP', 'HTTP', 'POP3', 'HTTPS', 'MySQL');
	$tcpports  	= array('21', '22', '25', '80', '110', '443', '3306');

/*	>>TeamSpeak3 Konfiguration<<	*/

  $tsserver	= array('1.1.1.1' , '2.2.2.2');

  $tsquery 	= array('10011' , '10011');

  $tsport  	= array('9987' , '9987');

  $tsuser	= array('serveradmin' , 'serveradmin');

  $tspass	= array('KENNWORT' , 'KENNWORT');

/*	>>Speicher Prüfung Konfiguration<<	*/
/*
	Nutzung:
					Das zu berechnende Verzeichnis oder Gerät aus /dev angeben.
					Für das KH Backup Verzeichnis zb. '/backup' angeben.
					Für die 1. Partition der 1 Festplatte zb. '/dev/sda1' angeben.
					Für die 2. Partition der 1 Festplatte zb. '/dev/sda2' angeben.
					u.s.w.
*/

  $diskspace	= array('/' , '/tmp' , '/dev/sda1');

?>
