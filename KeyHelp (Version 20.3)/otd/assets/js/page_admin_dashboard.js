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
debug(true);

//----------------------------------------------------------------------------------------------------------------------
// OTD Allgemeines
//----------------------------------------------------------------------------------------------------------------------

var blockreq = getXmlHttpRequestObject('Blocksystem');
var req = getXmlHttpRequestObject('TS3 CCS');
window.onload = getBlockStat();


//----------------------------------------------------------------------------------------------------------------------
// OTD Sleeper
//----------------------------------------------------------------------------------------------------------------------

function Sleeper(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
};


//----------------------------------------------------------------------------------------------------------------------
// OTD Requester
//----------------------------------------------------------------------------------------------------------------------

function getXmlHttpRequestObject(aw)
  {
    console.debug('%c(Funktion) Request ausgelöst von '+aw+' !','background: green; color: white;');
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
    console.debug('%c(Funktion) Request von '+aw+' abgeschlossen !','background: green; color: white;');
  };


//----------------------------------------------------------------------------------------------------------------------
// OTD Block Viewer Steuerung
//----------------------------------------------------------------------------------------------------------------------

    function getBlockStat()
      {
        console.debug('%c(Funktion) getBlockStat (Blocksystem) ausgelöst.','background: green; color: white;');
        if(blockreq.readyState == 4 || blockreq.readyState == 0)
          {
            console.debug('(Blocksystem) JSON Abfrage gesendet ... ');
            blockreq.open('GET', 'theme/otd/setting_block.json', true);
            blockreq.setRequestHeader("Content-Type","text/plain");
            blockreq.onreadystatechange = setBlockMessage;
            console.debug('(Blocksystem) JSON Abfrage, erwarte Ergebnis ... ');
            // await Sleeper(5000);
            blockreq.send(null);

            /* catch (e)
              {
                console.debug(e);
                document.getElementById('block_error_Div').style.display = "block";
                document.getElementById('otd-error_msg').innerHTML += e;

              }
              */
          }
        else
          {
            console.debug('%c(Blocksystem) Upps, da ging was schief ... ','background: red; color: white;');
          }
        console.debug('%c(Funktion) getBlockStat (Blocksystem) abgeschlossen.','background: green; color: white;');
      };

    function setBlockMessage()
      {
        console.debug('%c(Funktion) setBlockMessage (Blocksystem) ausgelöst.','background: green; color: white;');
        if(blockreq.readyState == 4)
          {
            try
              {
                console.debug('%c(Funktion) setBlockMessage (Blocksystem) Ergebnis empfangen.','background: green; color: white;');
                var response = eval('(' + blockreq.responseText+ ')');
                  for (var prop in response)
                    {
                      console.debug('%cSetze Variable: Bereich: '+prop+' = '+response[prop]+'.','background: green; color: white;');

                      if (response[prop] === 'true')
                        {
                          console.debug('%cBereich: '+prop+' ist als TRUE erkannt !','background: green; color: white;');
                            if (prop === 'block_teamspeak')
                              {
                                setInterval(TeamSpeakAbfrage, 10000);
                              }
			    if (prop === 'block_temperatur')
                              {
			        setInterval(TemperaturAbfrage, 15000);
                              }
                          var blockdiv  = document.getElementById(prop+'_Div');
                          if (blockdiv)
                            {
                              console.debug('%cBereich '+prop+' - DivID gefunden - SET durchgeführt !','background: green; color: white;');
                              document.getElementById(prop+'_Div').style.display = "block";
                            }
                          else
                            {
                             console.debug('%cBereich '+prop+' - DivID nicht gefunden - SET Übersprungen !','background: yellow; color: black;');
                            }
                          }
                       else
                         {
                           console.debug('%cBereich: '+prop+' ist als FALSE erkannt !','background: green; color: white;');
                           var blockdiv  = document.getElementById(prop+'_Div');
                           if (blockdiv)
                             {
                               console.debug('%cBereich '+prop+' - DivID gefunden - SET durchgeführt !','background: green; color: white;');
                               document.getElementById(prop+'_Div').style.display = "none";
                             }
                           else
                             {
                              console.debug('%cBereich '+prop+' - DivID nicht gefunden - SET Übersprungen !','background: yellow; color: black;');
                             }
                         }
                      console.debug('Variable '+prop+'='+response[prop]+' wurde gesetzt.');
                    }
                console.debug('%c(Funktion) setBlockMessage (Blocksystem) abgeschlossen.','background: green; color: white;');
              }
            catch (e)
              {
                console.debug(e);
                if (e == "SyntaxError: expected expression, got '<'")
                  {
                    document.getElementById('block_error_Div').style.display = "block";
                    document.getElementById('otd-error_msg').innerHTML += ('<b> <font color="RED"> Die JSON Datei wurde nicht gefunden ! </font> <br /> Überprüfen Sie ob der otd Ordner ausreichende Rechte (755) besitzt. </b> <br /> Tritt der Fehler weiterhin auf, klicken Sie auf das Copyright um zu erfahren wie Sie den Entwickler kontaktieren können.');
                  }
                else
                  {
                    document.getElementById('block_error_Div').style.display = "block";
                    document.getElementById('otd-error_msg').innerHTML += ('<b> <font color="RED"> Unbekannter Fehler festgestellt ! </font> <br /> Aktualisieren Sie bitte die Seite (F5 Taste). </b> <br /> Tritt der Fehler weiterhin auf, klicken Sie auf das Copyright um zu erfahren wie Sie den Entwickler kontaktieren können.');
                  }
              }
          }
      };


//======================================================================================================================
// OTD Boxen Ein- bzw. Ausklappen
//======================================================================================================================

    $('.card-header').on('click', function() {
        var $this = $(this);
        var $arrowIcon = $this.find('.app-menu-arrow i');
        var $menuList = $this.parent().find('.card-content');

        $this.toggleClass('app-is-collapsed');
        $arrowIcon.toggleClass('fa-angle-right');
        $arrowIcon.toggleClass('fa-angle-down');
        $menuList.toggle(250);
    });

	function toggleDialog() {
		var dialog = document.querySelector('dialog'),
			closeButton = document.getElementById('close-dialog');
		if (!dialog.hasAttribute('open')) {
			dialog.setAttribute('open', 'open');
			closeButton.focus();
			closeButton.addEventListener('click', toggleDialog);
			document.addEventListener('keydown', function (event) {
				if (event.keyCode == 27) {
					toggleDialog();
				}
			}, true);
			var div = document.createElement('div');
			div.id = 'backdrop';
			document.body.appendChild(div);
		} else {
			dialog.removeAttribute('open');
			var div = document.querySelector('#backdrop');
			div.parentNode.removeChild(div);
			lastFocus.focus();
		}
};

$('column .card-header.app-is-collapsed').trigger('click');


//----------------------------------------------------------------------------------------------------------------------
// OTD TeamSpeak Control Command Steuerung
//----------------------------------------------------------------------------------------------------------------------

    function getStat(control, tsp, tskey)
      {
        console.debug('%c(Funktion) getStat (TS3 CCS) ausgelöst.','background: green; color: white;');
        if(req.readyState == 4 || req.readyState == 0)
          {
            console.debug('%c(Funktion) getStat (TS3 CCS) Anfrage ...','background: green; color: white;');
            req.open('GET', 'theme/otd/admin_dash_status.php?realtime=teamspeak3_controller&tscontrol='+control+'&tsp='+tsp+'&tskey='+tskey, true);
            req.setRequestHeader("Content-Type","text/plain");
            console.debug('%c(Funktion) getStat (TS3 CCS) Anfrage ausgeführt !','background: green; color: white;');
            req.onreadystatechange = setMessage;
            req.send(null);
          }
        else
          {
            console.debug('%c(Funktion) getStat (TS3 CCS) Anfrage fehlerhaft, abgebrochen !','background: red; color: white;');
            document.getElementById('ts3stat').innerHTML = 'Upps, da ging was schief ...';
            console.warn(request.statusText, request.responseText);
          }
      };

    async function setMessage()
      {
        console.debug('%c(Funktion) setMessage (TS3 CCS) ausgelöst.','background: green; color: white;');
        if(req.readyState == 4)
          {
            console.debug('%c(Funktion) setMessage (TS3 CCS) Ergebnis auswerten ...','background: green; color: white;');
            var response = eval('(' + req.responseText+ ')');
            document.getElementById('ts3stat').innerHTML = response.servinst;
            console.debug('%c(Funktion) setMessage (TS3 CCS) Ergebnis OK.','background: green; color: white;');
            await Sleeper(5000);
            document.getElementById('ts3stat').innerHTML = '';
          }
        else
          {
            console.debug('%c(Funktion) setMessage (TS3 CCS) Ergebnis fehlerhaft !','background: red; color: white;');
          }
      };

//----------------------------------------------------------------------------------------------------------------------
// OTD Rückmeldung zur Version
//----------------------------------------------------------------------------------------------------------------------

     var DashVersion = $("#DashVersion");
     function VersionAbfrage(){
       console.debug('(Version) Abfrage ausgelöst.');
         $.post('theme/otd/admin_dash_status.php?realtime=dashversion', {
         }, function(VersionData){
            $(DashVersion).html(VersionData);
         });
     };

     VersionAbfrage();


//----------------------------------------------------------------------------------------------------------------------
// OTD RAID Status
//----------------------------------------------------------------------------------------------------------------------

     var RaidDiv = $("#Raid");
     function RaidAbfrage(){
       console.debug('(Raid Box) Abfrage ausgelöst.');
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
      console.debug('(S.M.A.R.T Box) Abfrage ausgelöst.');
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
       console.debug('(TeamSpeak3 Box) Intervalabfrage ausgelöst.');
          $.post('theme/otd/admin_dash_status.php?realtime=teamspeak3', {
         }, async function(data){
            $(TeamSpeak3Div).html(data);
            });
     };

     TeamSpeakAbfrage();


 //----------------------------------------------------------------------------------------------------------------------
 // OTD Temperatur Status
 //----------------------------------------------------------------------------------------------------------------------

      var TemperaturDiv = $("#Temperatur");
      function TemperaturAbfrage(){
        console.debug('(Temperatur Box) Intervalabfrage ausgelöst.');
           $.post('theme/otd/admin_dash_status.php?realtime=temperatur', {
          }, async function(temperaturdata){
             $(TemperaturDiv).html(temperaturdata);
             });
      };

      TemperaturAbfrage();


//----------------------------------------------------------------------------------------------------------------------
// OTD DiskSpace Status
//----------------------------------------------------------------------------------------------------------------------

    var DiskspaceDiv = $("#Diskspace");
    function DiskspaceAbfrage(){
      console.debug('(Diskspace Box) Abfrage ausgelöst.');
        $.post('theme/otd/admin_dash_status.php?realtime=diskspace', {
        }, function(DiskspaceData){
           $(DiskspaceDiv).html(DiskspaceData);
        });
    };

    DiskspaceAbfrage();

//======================================================================================================================
// News
//======================================================================================================================

    var $newsContainer = $('#app-news-container');

    if ($newsContainer.length)
    {
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
                    var till = response.items.length > 2 ? 2 : response.items.length;
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
    }

//======================================================================================================================
// Notes
//======================================================================================================================

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

//======================================================================================================================
// KeyHelp updates available
//======================================================================================================================

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

//======================================================================================================================
// Software updates available
//======================================================================================================================

    var $softwareUpdatesAvailable = $("#app-software-updates-available");
    var $softwareUpdatesContainer = $softwareUpdatesAvailable.parent();
    var $rebootRequired = $("#app-reboot-required");
    var $distUpgradeNote = $("#app-dist-upgrade-note");

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

                if (response.update_count > 0)
                {
                    $distUpgradeNote.show(0);
                }

                if (response.is_reboot_required)
                {
                    $rebootRequired.show();
                }

                $softwareUpdatesContainer.show(200);
            }
        }
    });

//======================================================================================================================
// Service status
//======================================================================================================================

    // Refresh on startup
    updateServiceStatus();

    // Continue to call the update.
    var serviceStatusTimer = setInterval(updateServiceStatus, 15000);


    function updateServiceStatus()
    {
        var $loadingIndicator = $('#app-service-status-loading');
        var $loadingIndicatorItems = $('.app-service-status-item-loading');
        var $serviceItems = $(".app-service-status-item");

        var ports = $serviceItems.map(function() {
            return $(this).data("port");
        }).get();

        ajax({
            action: 'get_service_status',
            data: {
                ports: ports
            },
            success: function(response)
            {
                $serviceItems.each(function() {
                    var $this = $(this);
                    var $online = $this.find('.app-service-status-item-online');
                    var $offline = $this.find('.app-service-status-item-offline');
                    var port = $this.data('port');

                    if (port in response.ports)
                    {
                        if (response.ports[port])
                        {
                            $online.show();
                            $offline.hide();
                        }
                        else
                        {
                            $online.hide();
                            $offline.show();
                        }
                    }
                });
            },
            error: function(textStatus, error)
            {
                ajaxLogError(textStatus, error);

                $('#app-service-status-content').hide();
                $('#app-service-status-error').show();

                clearInterval(serviceStatusTimer);
            },
            beforeSend: function()
            {
                $loadingIndicator.show();
            },
            complete: function()
            {
                $loadingIndicator.hide();
                // They are only used on initial page load.
                $loadingIndicatorItems.hide();
            }
        });
    }
