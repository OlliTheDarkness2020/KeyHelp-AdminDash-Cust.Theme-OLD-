<?php session_start(); ?>
<link rel="stylesheet" href="/theme/otd/assets/css/jquery.modal.css">
<?php

/* Globale Meldungen START */
  $modalerror = '<div align="center">
                  <font color="red">
                    <h1>
                      <b>
                        <u> ! Fehler festgestellt ! </u>
                      </b>
                    </h1>
                  </font>
                  <br />
                  <b>
                    <u> Mögliche Gründe </u>
                  </b>
                  <br />
                  <div align="left">
                    <li> Sie haben versucht diese Seite direkt aufzurufen. </li>
                    <li> Der Befehl wurde bereits ausgeführt. </li>
                  </div>
                  <br />
                  <b> Dieser Vorgang ist daher leider nicht (mehr) möglich ! </b>
                  <br />
                  <br />
                  <b>
                    <u>
                      <a href="/" target="_self"> Neu einloggen </a>
                    </u>
                  </b>
                </div>';

function liveExecuteCommand($cmd)
  {
    while (@ ob_end_flush());

    $proc = popen("$cmd 2>&1 ;", 'r');

    $live_output     = "";
    $complete_output = "";

    while (!feof($proc))
       {
         $live_output     = fread($proc, 4096);
         $complete_output = $complete_output . $live_output;
         echo "$live_output";
         @ flush();
       }

    pclose($proc);

    preg_match('/[0-9]+$/', $complete_output, $matches);

    return array (
                   'exit_status'  => intval($matches[0]),
                   'output'       => str_replace("Exit status : " . $matches[0], '', $complete_output)
                 );
  }

function get_string_between($string, $start, $end)
  {
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
  }

function toolsinstall($lockarea, $id_user, $status, $is_enabled, $type, $command, $description, $notify, $minute, $hour, $day_of_month, $month, $day_of_week)
  {
    if (file_exists('.lock_'.$lockarea))
      {
        // Ja - Tue nichts
      }
    else
      {
        // Nein - Erstelle CronJob und LockFile
          $khconfreader = file_get_contents('/etc/keyhelp/config/config.json', true);
          $data = json_decode($khconfreader,true);
            $dbconhost = $data["database"]["keyhelp"]["host"];
            $dbconname = $data["database"]["keyhelp"]["database"];
            $dbconusr = $data["database"]["keyhelp"]["username"];
            $dbconkennwkew = $data["database"]["keyhelp"]["password"];
          try
            {
              /* Type = 1200 | Data = a:1:{s:7:"id_user";i:0;} */
              $dbcon = new PDO("mysql:host=$dbconhost;dbname=$dbconname", $dbconusr, $dbconkennwkew);
              $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
              $dbcon->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAME'utf8'");
              /* $dbin = "INSERT INTO scheduled_tasks (id_user, status, is_enabled, type, command, description, notify, minute, hour, day_of_month, month, day_of_week) VALUES ($id_user, $status, $is_enabled, $type, $command, $description, $notify, $minute, $hour, $day_of_month, $month, $day_of_week)"; */
              $dbin = "INSERT INTO scheduled_tasks (id_user, status, is_enabled, type, command, description, notify, minute, hour, day_of_month, month, day_of_week) VALUES ('$id_user', '$status', '$is_enabled', '$type', '$command', '$description', '$notify', '$minute', '$hour', '$day_of_month', '$month', '$day_of_week')";
              $dbdata = 'a:1:{s:7:"id_user";i:0;}';
              $dbinfire = "INSERT INTO crontasks (type, data) VALUES ('1200', '$dbdata')";
              $dbcon->exec($dbin);
              $dbcon->exec($dbinfire);
              $cronerg = ' <font color="green"> Ok </font> ';
            }
          catch(PDOException $e)
            {
              echo "Scheduled Tasks: " . $dbin . "<br />" . $e->getMessage() . " - ";
              echo "KH Aufgabenverarbeitung: " . $dbinfire . "<br />" . $e->getMessage() . " - ";
              $cronerg = ' <font color="red"> Fehler </font> ';
              //exit();
            }
          finally
            {
              $dbcon = null;
            }
          $handle = fopen("/home/keyhelp/www/keyhelp/theme/otd/.lock_".$lockarea, "w");
          fwrite($handle, 'Installiert');
          fclose($handle);
          return $cronerg;
      }
  }

@$req_get = $_GET["modal"];

  if (isset($req_get))
    {
      switch ($req_get)
        {
          /* > Modal - Tool Graph Installation < */
          case 'tool_mailgraph_install':
            if(!isset($_SESSION['tool_mailgraph_install']))
              {
                echo $modalerror;
                exit;
              }
            else
              {
                if ($_SESSION['tool_mailgraph_install'] === 'yes we can')
                  {
                    /* toolsinstall(App / Tool, Cron-User, KH-Status (3), Aktivierung (1), Typ-Ausführung (exec), Befehl, Beschreibung, Mail-Benachrichtigung (none), Minute, Stunde, Tag-des-Monats, Monat, Tag-der-Woche) */
                    // echo toolsinstall('mailgraph', '0', '3', '1', 'exec', '/home/keyhelp/www/keyhelp/theme/otd/assets/tools/buildMailgraphGraphs.pl', 'OTD-Theme - MailGraph', 'none', '*/30', '*', '*', '*', '*');

                    echo toolsinstall('mailgraph', '0', '3', '1', 'exec', 'perl /home/keyhelp/www/keyhelp/theme/otd/assets/tools/mailgraph/buildMailgraphGraphs.pl', 'OTD-Theme - MailGraph', 'never', '*/30', '*', '*', '*', '*');

                    $userrights1 = liveExecuteCommand('chown keyhelp: /home/keyhelp/www/keyhelp/theme/otd/ -R');

                    $userrights2 = liveExecuteCommand('chmod 755 /home/keyhelp/www/keyhelp/theme/otd/ -R');

                    $rights1 = liveExecuteCommand('chmod 755 /home/keyhelp/www/keyhelp/theme/otd/assets/tools/mailgraph/buildMailgraphGraphs.pl');

                    $rights2 = liveExecuteCommand('chmod 755 /home/keyhelp/www/keyhelp/theme/otd/assets/tools/mailgraph/mailgraph.cgi');

                    if($userrights1['exit_status'] === 0)
                      {
                        $usermod1erg = ' <font color="green"> Ok </font> ';
                      }
                    else
                      {
                        $usermod1erg = ' <font color="red"> Fail </font> ';
                      }

                    if($userrights2['exit_status'] === 0)
                      {
                        $usermod2erg = ' <font color="green"> Ok </font> ';
                      }
                    else
                      {
                        $usermod2erg = ' <font color="red"> Fail </font> ';
                      }

                    if($rights1['exit_status'] === 0)
                      {
                        $chmod1erg = ' <font color="green"> Ok </font> ';
                      }
                    else
                      {
                        $chmod1erg = ' <font color="red"> Fail </font> ';
                      }

                    if($rights2['exit_status'] === 0)
                      {
                        $chmod2erg = ' <font color="green"> Ok </font> ';
                      }
                    else
                      {
                        $chmod2erg = ' <font color="red"> Fail </font> ';
                      }

                    echo
                      '
                      <div>
                        <div align="center">
                          <h3 class="text-danger"> <u> MailGraph wird installiert ... </u> </h3>
                        </div>
                      </div>
                      <table>
                        <tr>
                          <th style="text-decoration: underline; width:130px"> Vorgang </th>
                          <th style="text-decoration: underline; width:130px"> Status </th>
                        </tr>
                        <tr>
                          <td style="width:130px"> Benutzerrechte </td>
                          <td style="width:130px"> '.$usermod1erg.' </td>
                        </tr>
                        <tr>
                          <td style="width:130px"> </td>
                          <td style="width:130px"> '.$usermod2erg.' </td>
                        </tr>
                        <tr>
                          <td style="width:130px"> Dateirechte </td>
                          <td style="width:130px"> '.$chmod1erg.' </td>
                        </tr>
                        <tr>
                          <td style="width:130px"> </td>
                          <td style="width:130px"> '.$chmod2erg.' </td>
                        </tr>
                        <tr>
                          <td style="width:130px"> CronJob </td>
                          <td style="width:130px"> '.$cronerg.' </td>
                        </tr>
                        </table>
                          '
                        ;

                      echo '
                      <div class="modal-footer">
                        <hr>
                          <center> <b> <u> Alle Aufgaben abgeschlossen. <br /> Klicken Sie zum schließen, einfach ins DashBoard. </u> </b> </center>
                        <hr>
                      </div>
                      '
                    ;
                    session_unset();
                    session_destroy();
                    $_SESSION = array();
                    exit();
                  }
                else
                  {
                    echo $modalerror;
                    session_unset();
                    session_destroy();
                    $_SESSION = array();
                    exit();
                  }
              }
          echo $modalerror;
          session_unset();
          session_destroy();
          $_SESSION = array();
          exit();
          break;

          default:
            echo $modalerror;
            exit();
            break;
        }
    }
  else
    {
      echo $modalerror;
      exit();
    }
?>
