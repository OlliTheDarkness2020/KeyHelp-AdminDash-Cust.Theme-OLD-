<?php
include_once 'setting.php';

$tsdebug = "ohno";

/* Service Monitor Beginn */
function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}
/* Service Monitor Ende */

$blockfile = 	array(
								'block_news' => $block_news,
								'block_service' => $block_service,
								'block_teamspeak' => $block_teamspeak,
								'block_smart' => $block_smart,
								'block_raid' => $block_raid,
								'block_diskspace' => $block_diskspace
							);
$blockjson = json_encode($blockfile);
$handle = fopen ("setting_block.json", "w");
fwrite ($handle, $blockjson);
fclose ($handle);

	$stylecss = '
		<style type="text/css">
		<!--
		.alignleftfooter {
			float: left;
			width:50%;
			text-align:left;
		  }
		.alignrightfooter {
		   float: right;
		   width:50%;
		   text-align:right;
		  }​
		/* @group Blink */
		.blink {
			-webkit-animation: blink .75s linear infinite;
			-moz-animation: blink .75s linear infinite;
			-ms-animation: blink .75s linear infinite;
			-o-animation: blink .75s linear infinite;
			 animation: blink .75s linear infinite;
		}
		@-webkit-keyframes blink {
			0% { opacity: 1; }
			50% { opacity: 1; }
			50.01% { opacity: 0; }
			100% { opacity: 0; }
		}
		@-moz-keyframes blink {
			0% { opacity: 1; }
			50% { opacity: 1; }
			50.01% { opacity: 0; }
			100% { opacity: 0; }
		}
		@-ms-keyframes blink {
			0% { opacity: 1; }
			50% { opacity: 1; }
			50.01% { opacity: 0; }
			100% { opacity: 0; }
		}
		@-o-keyframes blink {
			0% { opacity: 1; }
			50% { opacity: 1; }
			50.01% { opacity: 0; }
			100% { opacity: 0; }
		}
		@keyframes blink {
			0% { opacity: 1; }
			50% { opacity: 1; }
			50.01% { opacity: 0; }
			100% { opacity: 0; }
		}
		/* @end */
		-->
		</style>
	';

$panel_version = '1.2.2';

if ($pucheck == "true" or $elcheck == "true") {
	echo $stylecss;
	$cdb = new PDO('mysql:host=SERVERIP-AUF-ANFRAGE;dbname=keyhelp_panel', 'DB-USER', 'KENNWORT');
	$statement = $cdb->prepare("SELECT * FROM control");
	$statement->execute();
}

if ($elcheck == "true")
{
	while($row = $statement->fetch())
	{
	if ($row['emergency'] == "1" and $row['emergency_version'] == $panel_version)
 	{
	echo '
		<div class="table-container">
		<table class="table is-fullwidth is-striped">
		 <tr>
			 <th>
				<u>
					<b>
						<font color="#FF0000">Notfall Abschaltung durch Entwickler !</font>
					</b>
				</u>
			</th>
		 </tr>
		 <tr>
			 <th>
				<u>
					<b>
						Version '.$panel_version.' wurde wegen eines schwerwiegenden Fehler´s deaktiviert !
					</b>
				</u>
			</th>
		 </tr>
		 <tr>
			 <th>
				<u>
					<b>
						<a href="https://community.keyhelp.de/viewtopic.php?f=16&t=8961" target="_blank">Hier geht es zum Beitrag im KeyHelp Forum</a>
					</b>
				</u>
			</th>
		 </tr>
		</table>
		</div>
			 ';
			 if ($pucheck == "true")
			 {
			 		if ($panel_version !== $row['version'])
			 		{
			 				echo '
			 				<div class="table-container">
			 									 <table class="table is-fullwidth is-striped">
			 											 <tbody>
			 				 <tr>
			 					 <th><u>Info zur Version</u></th>
			 				 </tr>
			 				 </tbody>
			 				 <tr>
			 					 <th>
			 					 	<u>
			 							<b>
			 								<a href="https://community.keyhelp.de/viewtopic.php?f=16&t=8961" class="tab blink" target="_blank">Es ist ein Update verfügbar !</a>
			 							</b>
			 						</u>
			 					</th>
			 				 </tr>
			 				</table>
			 				</div>
			 						';
			 		}
			 }
goto emergency_lock_active;
	}
}
}


if ($pucheck == "true")
{
	$statement = $cdb->prepare("SELECT * FROM control");
	$statement->execute();
	while($row = $statement->fetch())
	{
		if ($panel_version !== $row['version'])
		{
				echo '
				<div class="table-container">
									 <table class="table is-fullwidth is-striped">
											 <tbody>
				 <tr>
					 <th><u>Info zur Version</u></th>
				 </tr>
				 </tbody>
				 <tr>
					 <th>
					 	<u>
							<b>
								<a href="https://community.keyhelp.de/viewtopic.php?f=16&t=8961" class="tab blink" target="_blank">Es ist ein Update verfügbar !</a>
							</b>
						</u>
					</th>
				 </tr>
				</table>
				</div>
						';
		}
	}
}

switch ($_GET["realtime"])
	{
		/* UHR Beginn */

case 'uhr':

		if (date('H:i') == "12:00")
			{
				echo '<h3>Es ist Mittag, Zeit für einen Kaffee.</h3>';
			}
		echo "<b><u>" . date('d.m.Y') . " - " . date('H:i:s') . " Uhr</u></b>";
break;
		/* UHR Ende */

		/* Service Monitor Beginn */

case 'service':
/* --------- Dienste STATUS --------- */
echo $stylecss;
			echo '
			<div class="table-container">
            <table class="table is-fullwidth is-striped">
				<colgroup>
					<col span="1" style="width: 60%;">
					<col span="1" style="width: 20%;">
					<col span="1" style="width: 20%;">
				</colgroup>
            <tbody>
			<tr>
				<th><u>Name</u></th>
				<th><center><u>Port</u></center></th>
				<th><center><u>Status</u></center></th>
			</tr>
         ';
			foreach (array_combine($tcpports, $tcpdienste) as $tcpport => $tcpdienst)
				{
					$tcpconnection = @fsockopen($tcpserver, $tcpport);;
					if (is_resource($tcpconnection))
						{
							echo '<tr><td><b>' . $tcpdienst . ' </b></td><td><center> ' . $tcpport . ' </center></td><td><center> ' . ' <font color="green"> Online </font></center></td></tr>';
							fclose($tcpconnection);
						}
					else
						{
							echo '<tr><td><b>' . $tcpdienst . '</b></td><td><center> ' . $tcpport . ' </center></td><td><center><font class="tab blink" color="red"> Offline </font></center></td></tr>';
						}
				}
			echo '
            </tbody>
            </table>
			</div>
			<div align="right">Stand: '.date ("H:i:s - d. F Y ", time()).'</div>
	       ';
	exit();
	break;

	/* --------- RAID STATUS --------- */

	case 'raid':
		echo $stylecss;
				$raid = "/home/keyhelp/www/keyhelp/theme/otd/stats/raid.log";
				if(file_exists($raid))
				{
					$fp = fopen($raid, "r");
					if ($fp)
					{
						$zeile = 0;
						while(!feof($fp))
						{
							@$rinhalt[] = explode(":", fgets($fp));
							@$rinhalt[count($rinhalt)-1][0];
							@$rinhalt[count($rinhalt)-1][1];
							$zeile++;
						}
						fclose($fp);
					 }
				 }
				else
				{
					@$rinhalt = NULL;
					echo '<b>Vermutlich lief der Cronjob noch nicht.<br />Entweder warten Sie bis zur Ausführung des Cron oder führen folgenden Befehl auf der Shell aus:<br /><br />"/home/keyhelp/www/keyhelp/theme/otd/test.sh raid"<br /><br />Danach sollte diese Meldung verschwunden und die Werte angezeigt werden.';
				}
				echo '
				<div class="table-container">
				<table class="table is-fullwidth is-striped">
					<colgroup>
						<col span="1" style="width: 80%;">
						<col span="1" style="width: 20%;">
					</colgroup>
				<tbody>
				<tr>
					<th><u>Verbund</u></th>
					<th><center><u>Status</u></center></th>
				</tr>
				';
				if (@$rinhalt == NULL)
				{
					echo '<tr><td><b>Fehler:</b></td><td> Datei nicht gefunden !</td></tr>';
				}
				else
				{
					if (@$rinhalt[0][0] != NULL)
					{
						echo '<tr><td><b> '.@$rinhalt[0][0].' </b></td><td><center> '.@$rinhalt[0][1].' </center></td></tr>';
					}
					if (@$rinhalt[1][0] != NULL)
					{
						echo '<tr><td><b> '.@$rinhalt[1][0].' </b></td><td><center> '.@$rinhalt[1][1].' </center></td></tr>';
					}
					if (@$rinhalt[2][0] != NULL)
					{
						echo '<tr><td><b> '.@$rinhalt[2][0].' </b></td><td><center> '.@$rinhalt[2][1].' </center></td></tr>';
					}
					if (@@$rinhalt[3][0] != NULL)
					{
						echo '<tr><td><b> '.@$rinhalt[3][0].' </b></td><td><center> '.@$rinhalt[3][1].' </center></td></tr>';
					}
					if (@@$rinhalt[4][0] != NULL)
					{
						echo '<tr><td><b> '.@$rinhalt[4][0].' </b></td><td><center> '.@$rinhalt[4][1].' </center></td></tr>';
					}
				}
				echo '
				</tbody>
				</table>
				</div>
				<div align="right">Stand: '.date ("H:i:s - d. F Y ", filemtime($raid)).'</div>
				';
		exit();
		break;

	/* --------- SMART STATUS --------- */

	case 'smart':
		echo $stylecss;
					$smart = "/home/keyhelp/www/keyhelp/theme/otd/stats/smart.log";
					if(file_exists($smart))
					{
						$fp = fopen($smart, "r");
						if ($fp)
						{
						$zeile = 0;
						while(!feof($fp))
							{
								@$inhalt[] = explode(":", fgets($fp));
								@$inhalt[count(@$inhalt)-1][0];
								@$inhalt[count(@$inhalt)-1][1];
								$zeile++;
							}
						fclose($fp);
						}
					}
					else
					{
						@$inhalt = NULL;
						echo '<b>Vermutlich lief der Cronjob noch nicht.<br />Entweder warten Sie bis zur Ausführung des Cron oder führen folgenden Befehl auf der Shell aus:<br /><br />"/home/keyhelp/www/keyhelp/theme/otd/test.sh"<br /><br />Danach sollte diese Meldung verschwunden und die Werte angezeigt werden.';
					}
					echo '
					<div class="table-container">
						<table class="table is-fullwidth is-striped">
						<colgroup>
							<col span="1" style="width: 60%;">
							<col span="1" style="width: 20%;">
							<col span="1" style="width: 20%;">
						</colgroup>
					<tbody>
					<tr>
						<th><u>Festplatte</u></th>
						<th><center><u>Temp.</u></center></th>
						<th><center><u>Status</u></center></th>
					</tr>
					';
					if (@$inhalt == NULL)
					{
						echo '<b>Vermutlich lief der Cronjob noch nicht.<br />Entweder warten Sie bis zur Ausführung des Cron oder führen folgenden Befehl auf der Shell aus:<br /><br />"/home/keyhelp/www/keyhelp/theme/otd/test.sh smart"<br /><br />Danach sollte diese Meldung verschwunden sein und die Werte angezeigt werden.';
					}
					else
					{
					if (@$inhalt[0][0] == "Festplatte ")
					{
						echo '<tr><td><b> '.@$inhalt[0][1].' </b></td><td><center>'.@$inhalt[2][1].' </center></td><td><center> '.@$inhalt[1][1].' </center></td></tr>';
					}
					if (count(@$inhalt) > "2")
						{
							if (@$inhalt[3][0] == "Festplatte ")
							{
								echo '<tr><td><b> '.@$inhalt[3][1].' </b></td><td><center> '.@$inhalt[5][1].' </center></td><td><center> '.@$inhalt[4][1].' </center></td></tr>';
							}
							if (count(@$inhalt) > "5")
							{
								if (@$inhalt[6][0] == "Festplatte ")
								{
									echo '<tr><td><b> '.@$inhalt[6][1].' </b></td><td><center> '.@$inhalt[8][1].' </center></td><td><center> '.@$inhalt[7][1].' </center></td></tr>';
								}
								if (count(@$inhalt) > "8")
								{
									if (@$inhalt[9][0] == "Festplatte ")
									{
										echo '<tr><td><b> '.@$inhalt[9][1].' </b></td><td><center> '.@$inhalt[11][1].' </center></td><td><center> '.@$inhalt[10][1].' </center></td></tr>';
									}
									if (count(@$inhalt) > "11")
									{
										if (@$inhalt[12][0] == "Festplatte ")
										{
											echo '<tr><td><b> '.@$inhalt[12][1].' </b></td><td><center> '.@$inhalt[14][1].' </center></td><td><center> '.@$inhalt[13][1].' </center></td></tr>';
										}
									}
								}
							}
						}
					}
					echo '
					</tbody>
					</table>
					</div>
					<div align="right">Stand: '.date ("H:i:s - d. F Y ", filemtime($smart)).'</div>
				 ';
		exit();
		break;

	/* --------- TEAMSPEAK STATUS --------- */

	case 'teamspeak3':
		echo $stylecss;
				require_once ('assets/vendor/teamspeak3/TeamSpeak3.php');
				echo '
				<div class="table-container">
				<table class="table is-fullwidth is-striped">
					<colgroup>
						<col span="1" style="width: 40%;">
						<col span="1" style="width: 30%;">
						<col span="1" style="width: 10%;">
						<col span="1" style="width: 20%;">
					</colgroup>
				<tbody>
				<tr>
					<th><u>Server Name</u></th>
					<th><center><u>IP</u></center></th>
					<th><center><u>Status</u></center></th>
					<th><center><u>Start / Stop</u></center></th>
				</tr>
			';
				foreach ( $tsserver as $idx => $val )
				{
					$all_array[] = [ $val, $tsquery[$idx], $tsport[$idx], $tsuser[$idx], $tspass[$idx] ];
				}
				foreach ($all_array as $item)
					{
						try {
							$uri = "serverquery://".$item[3].":".$item[4]."@".$item[0].":".$item[1];
							$ts3 = TeamSpeak3::factory($uri);

							try
								{
									session_start(['cookie_lifetime' => 43200]);
									$uri = "serverquery://".$item[3].":".$item[4]."@".$item[0].":".$item[1]."/?server_port=".$item[2];
									$_SESSION["_TS3_".$item[0].$item[2]] = serialize($uri);
									session_write_close();
									$ts3 = TeamSpeak3::factory($uri);
							echo '						 	
								<tr>
									<td><b>' . $ts3->virtualserver_name . '</b></td>
									<td> <center> <i class="far fa-eye" title="' . $item[0] . ':' . $item[2] . '"></i> </center> </td>
									<td> <center> <font color="green"> Online </font> </center> </td>
									<td> <center> <a onclick="getStat(\'stop\', '.$item[2].', \''.$item[0].$item[2].'\')"> <i class="far fa-stop-circle fa-lg"></i> </a> </center> </td>
								</tr>
							';
								}
							catch(Exception $e)
								{
								echo '
									<tr>
										<td> <b> ---- </b> </td>
										<td> <center> <h4>' . $item[0] . ':' . $item[2] . '</h4> </center> </td>
										<td> <center> <font color="red"> Offline </font> </center> </td>
										<td> <center> <a onclick="getStat(\'start\', '.$item[2].', \''.$item[0].$item[2].'\')"> <i class="far fa fa-play-circle fa-lg"></i> </a> </center> </td>
									</tr>
								';
								}
						}
						catch(Exception $e)
						{
						echo '
							<tr>
								<td colspan="4"><font color="red">Hostsystem <b>' . $item[0] . ':' . $item[2] . '</b> nicht erreichbar! Bitte die Datei "setting.php" und ggf. den Host prüfen!</font></td>
							</tr>
						';
						}
					}
					echo '
					</tbody>
				</table><div>
				<p class="alignleftfooter" id="ts3stat"></p>
				<p class="alignrightfooter">Stand: '.date ("H:i:s - d. F Y ", time()).'</p>
				</div></div>
				';
		exit();
		break;

		/* --------- TEAMSPEAK Controller --------- */

		case 'teamspeak3_controller':
		require_once('assets/vendor/teamspeak3/TeamSpeak3.php');

			$tscontrol	= $_GET["tscontrol"];
			$tskey 			= $_GET["tskey"];
			$tsp  			= $_GET["tsp"];

			session_start(['cookie_lifetime' => 43200]);
			$uri = unserialize($_SESSION["_TS3_".$tskey]);

			$ts3port = intval(substr($uri, strrpos($uri, "=") + 1));
			$ts3ip = get_string_between($uri, '@', ':');
			
			$ts3 = TeamSpeak3::factory(substr($uri, 0, strpos( $uri, '/?server')));
			$ts3id = $ts3->serverIdGetByPort($ts3port);
			
			if ($tscontrol == 'start')
				{
					if ($tsdebug === "ohyes")
						{
							$ts3->message("Debug: Server gestartet ! (No Action, wir sind im Test Mode)");
						}
					else
						{
							$ts3->serverStart($ts3id);
						}

					echo '{"servinst": "<b> Server ' . $ts3ip . ':' . $ts3port . ' gestartet! </b>"}';

					exit();
				}

			if ($tscontrol == 'stop')
				{
					if ($tsdebug === "ohyes")
						{
							$ts3->message("Debug: Server gestoppt ! (No Action, wir sind im Test Mode)");
						}
					else
						{
							$ts3->serverStop($ts3id, "Der Server wurde durch den Anbieter abgeschaltet! ");
						}

					echo '{"servinst": "<b> Server ' . $ts3ip . ':' . $ts3port . ' gestoppt! </b>"}';

					exit();
				}

			if ($tscontrol == 'del')
				{
					if ($tsdebug === "ohyes")
						{
							$ts3->message("Debug: Server gelöscht ! (No Action, wir sind im Test Mode)");
						}
					else
						{
							$ts3->serverDelete($ts3id);
						}

					echo '{"servinst": "<b> Server gelöscht ! </b>"}';

					exit();
				}
		exit();
		break;

/* Service Monitor Ende */

case 'diskspace':
	echo $stylecss;
		echo '
		<div class="table-container">
		<table class="table is-fullwidth is-striped">
			<colgroup>
				<col span="1" style="width: 60%;">
				<col span="1" style="width: 10%;">
				<col span="1" style="width: 10%;">
				<col span="1" style="width: 20%;">
			</colgroup>
		<tbody>
		<tr>
			<th><u>Mount</u></th>
			<th><center><u>Belegt</u></center></th>
			<th><center><u>Frei</u></center></th>
			<th><center><u>Prozent</u></center></th>
		</tr>
		';
	for($i = 0; $i < count($diskspace); ++$i)
		{
			$belegt	=	'df -h --output=used '.$diskspace[$i];
			$frei	=	'df -h --output=avail '.$diskspace[$i];
			$prozent	=	'df -h --output=pcent '.$diskspace[$i];
			$disk_belegt	=	exec($belegt);
			$disk_frei	=	exec($frei);
			$disk_prozent	=	exec($prozent);
			$disk_prozent = str_replace("%", "", $disk_prozent);
		echo
			'
				<tr>
					<td><b> '.$diskspace[$i].' </b></td>
					<td>
						<center>
							'.$disk_belegt.'
						</center>
					</td>
					<td>
						<center>
							'.$disk_frei.'
						</center>
					</td>
					<td>
						<center>
							<progress class="progress is-xsmall is-success" value="'.$disk_prozent.'" max="100"></progress>
							'.$disk_prozent.'%
						</center>
					</td>
				</tr>
			'
		;
	 }
		echo '
	</tbody>
</table>
</div>
<div align="right">Stand: '.date ("H:i:s - d. F Y ", time()).'</div>
		';
	exit();
	break;

	default:
		echo 'Keine Ausgabe gewählt oder Daten fehlerhaft.';
	break;
	}

/* SWITCH LISTE Ende */

?>

<br />

<?php
emergency_lock_active:

if ($_GET["realtime"] === "teamspeak3_controller")
	{

	}
else
	{
		echo '<b> <u> <p style="text-align: center;"> Created 2020 by OlliTheDarkness </p> </u> </b>';
	}

?>
