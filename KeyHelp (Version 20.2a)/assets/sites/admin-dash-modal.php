<link rel="stylesheet" href="/theme/otd/assets/css/jquery.modal.css">
<?php

$req_get = $_GET["modal"];

  if (isset($req_get))
    {
      switch ($req_get)
        {
          /* Modal > Test1 < */
          case 'test1':
              echo
                '
                <div>
                  <div align="center">
                    <h3 class="text-danger"> Modal 1 </h3>
                    <p class="bg-warning"> Ich bin das hübscheste Modal der Welt ;) </p>
                    <p class="bg-warning"> und das ist meine Message: ' . get_string_between($_GET['uri'], '@', ':') . ' </p>
                  </div>
                </div>
                <table>
                <tr>
                  <th style="width:130px">IP</td>
                  <td> ' . get_string_between($_GET['uri'], '@', ':') . ' </td>
                </tr>
                <tr>
                <th style="width:130px">Port</td>
                <td> ' . get_string_between($_GET['uri'], '_port="', '') . ' </td>
              </tr>
              </table> 
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" id="modalbutton" name="stopserver" class="btn btn-success">test</button>
            </div>
                '
              ;
          exit();
          break;
          
          default:
            exit();
            break;
        }
    }
  else
    {
      exit();
    }

function get_string_between($string, $start, $end){
  $string = ' ' . $string;
  $ini = strpos($string, $start);
  if ($ini == 0) return '';
  $ini += strlen($start);
  $len = strpos($string, $end, $ini) - $ini;
  return substr($string, $ini, $len);
}
?>
