<style type="text/css">
<!--
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

<?php
$panel_version = '1.1.0';

include_once 'setting.php';

if ($pucheck == "true" or $elcheck == "true") {
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
	if ($block_service == 'true')
		{
			echo '<div align="center"><h2><u>Basics</u></h2>(Stand: '.date ("d.m.Y H:i", time()).' Uhr)</div>
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
			foreach (array_combine($tcpports, $tcpdienste) as $tcpport       => $tcpdienst)
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
	       ';
		}
/* --------- TEAMSPEAK STATUS --------- */
	if ($block_teamspeak == 'true')
		{
			require_once ('assets/vendor/teamspeak3/TeamSpeak3.php');
			echo '<div align="center"><h2><u>Teamspeak</u></h2>(Stand: '.date ("d.m.Y H:i", time()).' Uhr)</div>
			<div class="table-container">
			<table class="table is-fullwidth is-striped">
				<colgroup>
					<col span="1" style="width: 60%;">
					<col span="1" style="width: 20%;">
					<col span="1" style="width: 20%;">
				</colgroup>
			<tbody>
			<tr>
				<th><u>Server Name</u></th>
				<th><center><u>IP</u></center></th>
				<th><center><u>Status</u></center></th>
			</tr>
		';
			foreach ( $tsserver as $idx => $val ) 
			{
				$all_array[] = [ $val, $tsquery[$idx], $tsport[$idx], $tsuser[$idx], $tspass[$idx] ];
			}
			foreach ($all_array as $item)
				{
					try
						{
							$ts3      = TeamSpeak3::factory("serverquery://" . $item[3] . ":" . $item[4] . "@" . $item[0] . ":" . $item[1] . "/?server_port=" . $item[2]);
					echo '
						<tr>
							<td><b>' . $ts3->virtualserver_name . '</b></td>
							<td><center>' . $item[0] . ':' . $item[2] . '</center></td>
							<td><center><font color="green"> Online </font></center></td>
						</tr>
					';
						}
					catch(Exception $e)
					{
					  echo '
						<tr>
							<td><b>----</b></td>
							<td><center>' . $item[0] . ':' . $item[2] . '</center></td>
							<td><center><font class="tab blink" color="red"> Offline </font></center></td>
						</tr>
					';
					}
				}
				echo '
			</tbody>
			</table>
			</div>
			';
		}
/* --------- SMART STATUS --------- */
	if ($block_smart == 'true')
		{
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
			<div align="center"><h2><u>S.M.A.R.T Status</u></h2>(Stand: '.date ("d.m.Y H:i", filemtime($smart)).' Uhr)</div>
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
		 ';
		}
/* --------- RAID STATUS --------- */
	if ($block_raid == 'true')
		{
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
			<div align="center"> <h2> <u> RAID Status </u> </h2> (Stand: ' .date ("d.m.Y H:i", filemtime($raid)). ' Uhr)</div>
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
			';
		}
	break;
/* Service Monitor Ende */
	default:
		echo 'Keine Ausgabe gewählt oder Daten fehlerhaft.';
	break;
	}
/* SERVICE LISTE Ende */
?>
<br />
<?php
emergency_lock_active:
?>
<b><u><p style="text-align: center;">Created 2020 by OlliTheDarkness</p></u></b>
