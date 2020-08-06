//----------------------------------------------------------------------------------------------------------------------
// OTD Debug System On / Off
//----------------------------------------------------------------------------------------------------------------------

var consoleHolder = console;
function debug(bool){
    if(!bool){
        consoleHolder = console;
        console = {};
        Object.keys(consoleHolder).forEach(function(key){
            console[key] = function(){};
        })
    }else{
        console = consoleHolder;
    }
}
debug(false);

//----------------------------------------------------------------------------------------------------------------------
// OTD Allgemeines
//----------------------------------------------------------------------------------------------------------------------

var blockreq = getXmlHttpRequestObject('Blocksystem');
var req = getXmlHttpRequestObject('TS3 CCS');

window.onload = getBlockStat();


//----------------------------------------------------------------------------------------------------------------------
// Sleeper
//----------------------------------------------------------------------------------------------------------------------

function Sleeper(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
};


//----------------------------------------------------------------------------------------------------------------------
// OTD Requester
//----------------------------------------------------------------------------------------------------------------------

function getXmlHttpRequestObject(aw)
  {
    console.debug('(Request) Funktion ausgelöst von '+aw+' ! ');
    if(window.XMLHttpRequest)
      {
        return new XMLHttpRequest();
      }
    else if(window.ActiveXObject)
      {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    else
      {
        alert('Ajax funktioniert bei Ihnen nicht !');
      }
  };


//----------------------------------------------------------------------------------------------------------------------
// OTD Block Viewer Steuerung
//----------------------------------------------------------------------------------------------------------------------

    function getBlockStat()
      {
        console.debug('(Funktion) getBlockStat (Blocksystem) ausgelöst. ');
        if(blockreq.readyState == 4 || blockreq.readyState == 0)
          {
            console.debug('(Blocksystem) JSON Abfrage gesendet ... ');
            blockreq.open('GET', 'theme/otd/setting_block.json', true);
            blockreq.setRequestHeader("Content-Type","text/plain");
            blockreq.onreadystatechange = setBlockMessage;
            console.debug('(Blocksystem) JSON Abfrage, erwarte Ergebnis ... ');
            // await Sleeper(5000);
            blockreq.send(null);
          }
        else
          {
            console.debug('(Blocksystem) Upps, da ging was schief ... ');
          }
      };

    function setBlockMessage()
      {
        console.debug('(Funktion) setBlockMessage (Blocksystem) ausgelöst. ');
        if(blockreq.readyState == 4)
          {
            console.debug('(Funktion) setBlockMessage (Blocksystem) Ergebnis empfangen. ');
            var response = eval('(' + blockreq.responseText+ ')');
              for (var prop in response)
                {
                  console.debug('Setze Variable: Bereich: '+prop+' = '+response[prop]+'');

                  if (response[prop] === 'true')
                    {
                      console.debug('Bereich: '+prop+' ist als TRUE erkannt !');
                      document.getElementById(prop+'_Div').style.display = "block";
                     }
                   else
                     {
                       console.debug('Bereich: '+prop+' ist als FALSE erkannt !');
                       document.getElementById(prop+'_Div').style.display = "none";
                     }
                  console.debug('Variable wurde gesetzt !');
                }
            console.debug('(Funktion) setBlockMessage (Blocksystem) abgeschlossen. ');
          }
      };


//----------------------------------------------------------------------------------------------------------------------
// OTD TeamSpeak Control Command Steuerung
//----------------------------------------------------------------------------------------------------------------------

    function getStat(control, tsp, tskey)
      {
        console.debug('(Funktion) getStat (TS3 CCS) ausgelöst. ');
        if(req.readyState == 4 || req.readyState == 0)
          {
            console.debug('(Funktion) getStat (TS3 CCS) Anfrage ... ');
            req.open('GET', 'theme/otd/admin_dash_status.php?realtime=teamspeak3_controller&tscontrol='+control+'&tsp='+tsp+'&tskey='+tskey, true);
            req.setRequestHeader("Content-Type","text/plain");
            console.debug('(Funktion) getStat (TS3 CCS) Anfrage ausgeführt ! ');
            req.onreadystatechange = setMessage;
            req.send(null);
          }
        else
          {
            console.debug('(Funktion) getStat (TS3 CCS) Anfrage fehlerhaft, abgebrochen ! ');
            document.getElementById('ts3stat').innerHTML = 'Upps, da ging was schief ...';
            console.warn(request.statusText, request.responseText);
          }
      };

    async function setMessage()
      {
        console.debug('(Funktion) setMessage (TS3 CCS) ausgelöst. ');
        if(req.readyState == 4)
          {
            console.debug('(Funktion) setMessage (TS3 CCS) Ergebnis auswerten ...');
            var response = eval('(' + req.responseText+ ')');
            document.getElementById('ts3stat').innerHTML = response.servinst;
            console.debug('(Funktion) setMessage (TS3 CCS) Ergebnis OK. ');
            await Sleeper(15000);
            document.getElementById('ts3stat').innerHTML = '';
          }
      };


//----------------------------------------------------------------------------------------------------------------------
// OTD Service Status
//----------------------------------------------------------------------------------------------------------------------

     var ServiceDiv = $("#Service");
     function ServiceAbfrage(){
       console.debug('(Service Box) Intervalabfrage ausgelöst ! ');
         $.post('theme/otd/admin_dash_status.php?realtime=service', {
         }, function(ServiceData){
            $(ServiceDiv).html(ServiceData);
         });
     };

     ServiceAbfrage();
     setInterval(ServiceAbfrage, 5000);


//----------------------------------------------------------------------------------------------------------------------
// OTD RAID Status
//----------------------------------------------------------------------------------------------------------------------

     var RaidDiv = $("#Raid");
     function RaidAbfrage(){
       console.debug('(Raid Box) Abfrage ausgelöst ! ');
         $.post('theme/otd/admin_dash_status.php?realtime=raid', {
         }, function(RaidData){
            $(RaidDiv).html(RaidData);
         });
     };

     RaidAbfrage();


//----------------------------------------------------------------------------------------------------------------------
// OTD S.M.A.R.T Status
//----------------------------------------------------------------------------------------------------------------------

    var SmartDiv = $("#Smart");
    function SmartAbfrage(){
      console.debug('(S.M.A.R.T Box) Abfrage ausgelöst ! ');
        $.post('theme/otd/admin_dash_status.php?realtime=smart', {
        }, function(SmartData){
           $(SmartDiv).html(SmartData);
        });
    };

    SmartAbfrage();


//----------------------------------------------------------------------------------------------------------------------
// OTD TeamSpeak Control Status
//----------------------------------------------------------------------------------------------------------------------

     var TeamSpeak3Div = $("#TeamSpeak3");
     function TeamSpeakAbfrage(){
       console.debug('TeamSpeak3 Box Intervalabfrage ausgelöst !');
          $.post('theme/otd/admin_dash_status.php?realtime=teamspeak3', {
         }, async function(data){
            $(TeamSpeak3Div).html(data);
            });
     };

     TeamSpeakAbfrage();
     setInterval(TeamSpeakAbfrage, 5000);


//----------------------------------------------------------------------------------------------------------------------
// OTD DiskSpace Status
//----------------------------------------------------------------------------------------------------------------------

    var DiskspaceDiv = $("#Diskspace");
    function DiskspaceAbfrage(){
      console.debug('(Diskspace Box) Abfrage ausgelöst ! ');
        $.post('theme/otd/admin_dash_status.php?realtime=diskspace', {
        }, function(DiskspaceData){
           $(DiskspaceDiv).html(DiskspaceData);
        });
    };

    DiskspaceAbfrage();


//----------------------------------------------------------------------------------------------------------------------
// news
//----------------------------------------------------------------------------------------------------------------------

    var $newsContainer = $('#app-news-container');
    var newsTemplate = Handlebars.compile($('#app-news-template').html());

    ajax({
        action: 'get_news',
        data: {
            language: hash['language']
        },
        success: function(response) {
            if (response.error)
            {
                $newsContainer.html(response.error_msg.replace(/\n/, '<br>'));
            }
            else
            {
                $newsContainer.html('');
                var till = response.items.length > 3 ? 3 : response.items.length;
                for (var i = 0; i < till; i++)
                {
                    var placeholder = response.items[i];
                    placeholder.excerpt = $('<textarea></textarea>').html(placeholder.excerpt).text();

                    placeholder.has_spacer = i < (till - 1);
                    $newsContainer.append(newsTemplate(placeholder));
                }
            }
        },
        error: function(textStatus, error)
        {
            $newsContainer.html('AJAX_ERROR');
            ajaxLogError(textStatus, error);
        },
        beforeSend: function()
        {
            $newsContainer.addClass('is-loading');
        },
        complete: function()
        {
            $newsContainer.removeClass('is-loading');
        }
    });

//----------------------------------------------------------------------------------------------------------------------
// notes
//----------------------------------------------------------------------------------------------------------------------

    var $notes = $('#app-notes');
    var $textarea = $('#app-notes-textarea');
    var $btnEdit =  $('#app-edit-notes');
    var $btnSave =  $('#app-save-notes');
    var $card = $notes.closest('.card');

    $btnEdit.click(function() {
        $btnEdit.hide();
        $btnSave.show(200);
        $notes.hide();
        $textarea.val($notes.text());
        $textarea.trigger('input'); // trigger auto-resize
        $textarea.show(200);
        $textarea.focus();
    });

    $textarea.on('blur', function() {
        var string = $textarea.val();
        var stringSanitized = string.replace(/(?:\r\n|\r|\n)/g, "\n").trim();

        $btnEdit.show(200);
        $btnSave.hide();
        $textarea.hide();
        $notes.text(stringSanitized);
        $notes.show(200);

        ajax({
            action: 'set_servernotes',
            data: {
                server_notes: stringSanitized
            },
            beforeSend: function()
            {
                $card.addClass('is-loading');
            },
            complete: function()
            {
                $card.removeClass('is-loading');
            }
        });
    });

//----------------------------------------------------------------------------------------------------------------------
// keyhelp update available
//----------------------------------------------------------------------------------------------------------------------

    var $keyhelpUpdateAvailable = $('#app-keyhelp-update-available');
    var $keyhelpUpdateInfoError = $('#app-keyhelp-update-info-error');

    ajax({
        action   : 'get_latestversion',
        success: function(response)
        {
            if (response.error)
            {
                $keyhelpUpdateInfoError.show();
            }
            else if (response.is_update_available)
            {
                $keyhelpUpdateAvailable.show();
            }
        },
        error: function(textStatus, error)
        {
            $keyhelpUpdateInfoError.show();
            ajaxLogError(textStatus, error);
        }
    });

//----------------------------------------------------------------------------------------------------------------------
// software updates available
//----------------------------------------------------------------------------------------------------------------------

    var $softwareUpdatesAvailable = $("#app-software-updates-available");
    var $softwareUpdatesContainer = $softwareUpdatesAvailable.parent();
    var $rebootRequired = $("#app-reboot-required");

    ajax({
        action: 'get_server_updates',
        success: function(response) {
            if (response.error)
            {
                console.log(response.error_msg);
            }
            else
            {
                $softwareUpdatesAvailable.prepend(response.update_message).show();

                if (response.is_reboot_required)
                {
                    $rebootRequired.show();
                }

                $softwareUpdatesContainer.show(200);
            }
        }
    });
