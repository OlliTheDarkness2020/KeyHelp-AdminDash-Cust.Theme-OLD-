#!/usr/bin/perl

package keyhelpMailgraph;

use strict;
use warnings;
use File::Path qw(make_path);
use RRDs;

sub new
{
	my ($class, %args) = @_;
    return bless { %args }, $class;
}

sub _createMailgraphDir
{
	my ($self) = @_;
	unless (-d $self->{mailgraphDir}) 
	{
		make_path($self->{mailgraphDir}, {mode => 0755, owner=>'keyhelp', group=>'keyhelp'});
    }
}

sub _buildKeyHelpMailgraph
{
    my $self = shift;
	return 0 unless -f $self->{mailgraphRRDFile};
	
    my $dayStep = $self->{dayRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $dayKeyhelpMailgraphTitle = 'KeyHelp Mailgraph - Daily - ' . $self->{keyhelpHostname};
    my $dayOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_day.png';

    my $weekStep = $self->{weekRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $weekMailgraphTitle = 'KeyHelp Mailgraph - Weekly - ' . $self->{keyhelpHostname};
    my $weekOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_week.png';

    my $monthStep = $self->{monthRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $monthMailgraphTitle = 'KeyHelp Mailgraph - Monthly - ' . $self->{keyhelpHostname};
    my $monthOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_month.png';

    my $yearStep = $self->{yearRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $yearMailgraphTitle = 'KeyHelp Mailgraph - Yearly - ' . $self->{keyhelpHostname};
    my $yearOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_year.png';

    my $endrange -= $self->{endrange} % $dayStep;
    my $date = localtime( time );
    $date =~ s|:|\\:|g unless $RRDs::VERSION < 1.199908;
	
	$self->_createKeyhelpMailgraphPicture(
        $self->{mailgraphRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{dayRange}, $endrange,
		$dayStep, $dayKeyhelpMailgraphTitle, $dayOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphPicture(
        $self->{mailgraphRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{weekRange}, $endrange,
		$weekStep, $weekMailgraphTitle, $weekOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphPicture(
        $self->{mailgraphRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{monthRange}, $endrange,
		$monthStep, $monthMailgraphTitle, $monthOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphPicture(
        $self->{mailgraphRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{yearRange}, $endrange,
		$yearStep, $yearMailgraphTitle, $yearOutputfile, $date, $self->{uid}, $self->{gid}
    );
	
}

sub _buildKeyHelpVirusMailgraph
{
    my $self = shift;
	return 0 if !-f $self->{mailgraphRRDFile} || !-f $self->{mailgraphVirusRRDFile};
	
    my $dayStep = $self->{dayRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $dayKeyhelpMailgraphTitle = 'KeyHelp Mailgraph virus - Daily - ' . $self->{keyhelpHostname};
    my $dayOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_virus_day.png';

    my $weekStep = $self->{weekRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $weekMailgraphTitle = 'KeyHelp Mailgraph virus - Weekly - ' . $self->{keyhelpHostname};
    my $weekOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_virus_week.png';

    my $monthStep = $self->{monthRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $monthMailgraphTitle = 'KeyHelp Mailgraph virus - Monthly - ' . $self->{keyhelpHostname};
    my $monthOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_virus_month.png';

    my $yearStep = $self->{yearRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $yearMailgraphTitle = 'KeyHelp Mailgraph virus - Yearly - ' . $self->{keyhelpHostname};
    my $yearOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_virus_year.png';

    my $endrange -= $self->{endrange} % $dayStep;
    my $date = localtime( time );
    $date =~ s|:|\\:|g unless $RRDs::VERSION < 1.199908;
	
	$self->_createKeyhelpMailgraphVirusPicture(
        $self->{mailgraphRRDFile}, $self->{mailgraphVirusRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{dayRange}, $endrange,
		$dayStep, $dayKeyhelpMailgraphTitle, $dayOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphVirusPicture(
        $self->{mailgraphRRDFile}, $self->{mailgraphVirusRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{weekRange}, $endrange,
		$weekStep, $weekMailgraphTitle, $weekOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphVirusPicture(
        $self->{mailgraphRRDFile}, $self->{mailgraphVirusRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{monthRange}, $endrange,
		$monthStep, $monthMailgraphTitle, $monthOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphVirusPicture(
        $self->{mailgraphRRDFile}, $self->{mailgraphVirusRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{yearRange}, $endrange,
		$yearStep, $yearMailgraphTitle, $yearOutputfile, $date, $self->{uid}, $self->{gid}
    );	
}

sub _buildKeyHelpGreylistMailgraph
{
    my $self = shift;
	return 0 if !-f $self->{mailgraphGreylistRRDFile};
	
    my $dayStep = $self->{dayRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $dayKeyhelpMailgraphTitle = 'KeyHelp Mailgraph greylist - Daily - ' . $self->{keyhelpHostname};
    my $dayOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_greylist_day.png';

    my $weekStep = $self->{weekRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $weekMailgraphTitle = 'KeyHelp Mailgraph greylist - Weekly - ' . $self->{keyhelpHostname};
    my $weekOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_greylist_week.png';

    my $monthStep = $self->{monthRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $monthMailgraphTitle = 'KeyHelp Mailgraph greylist - Monthly - ' . $self->{keyhelpHostname};
    my $monthOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_greylist_month.png';

    my $yearStep = $self->{yearRange} * $self->{pointsPerSample} / $self->{xPoints};
    my $yearMailgraphTitle = 'KeyHelp Mailgraph greylist - Yearly - ' . $self->{keyhelpHostname};
    my $yearOutputfile = $self->{mailgraphDir} . '/keyhelp_mailgraph_greylist_year.png';

    my $endrange -= $self->{endrange} % $dayStep;
    my $date = localtime( time );
    $date =~ s|:|\\:|g unless $RRDs::VERSION < 1.199908;
	
	$self->_createKeyhelpMailgraphGreylistPicture(
        $self->{mailgraphGreylistRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{dayRange}, $endrange,
		$dayStep, $dayKeyhelpMailgraphTitle, $dayOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphGreylistPicture(
        $self->{mailgraphGreylistRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{weekRange}, $endrange,
		$weekStep, $weekMailgraphTitle, $weekOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphGreylistPicture(
        $self->{mailgraphGreylistRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{monthRange}, $endrange,
		$monthStep, $monthMailgraphTitle, $monthOutputfile, $date, $self->{uid}, $self->{gid}
    );
	$self->_createKeyhelpMailgraphGreylistPicture(
        $self->{mailgraphGreylistRRDFile}, $self->{xPoints}, $self->{yPoints}, $self->{yearRange}, $endrange,
		$yearStep, $yearMailgraphTitle, $yearOutputfile, $date, $self->{uid}, $self->{gid}
    );	
}

sub _createKeyhelpMailgraphPicture
{
	my (
        undef, $rrdfile, $setXpoints, $setYpoints, $setRange, $setEndrange, $setStep, $setTitle, $setOutputfile, $setDate,
		$keyhelpUid, $keyhelpGid
    ) = @_;
	
    my %keyhelpMailgraphColor = (sent => '000099', received => '009900');
	
	my @RRDArgs = (
        "DEF:sent=$rrdfile:sent:AVERAGE",
        "DEF:msent=$rrdfile:sent:MAX",
        "CDEF:rsent=sent,60,*",
        "CDEF:rmsent=msent,60,*",
        "CDEF:dsent=sent,UN,0,sent,IF,$setStep,*",
        "CDEF:ssent=PREV,UN,dsent,PREV,IF,dsent,+",
        "AREA:rsent#$keyhelpMailgraphColor{sent}:Sent    ",
        'GPRINT:ssent:MAX:total\: %8.0lf msgs',
        'GPRINT:rsent:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmsent:MAX:max\: %4.0lf msgs/min\l',

        "DEF:recv=$rrdfile:recv:AVERAGE",
        "DEF:mrecv=$rrdfile:recv:MAX",
        "CDEF:rrecv=recv,60,*",
        "CDEF:rmrecv=mrecv,60,*",
        "CDEF:drecv=recv,UN,0,recv,IF,$setStep,*",
        "CDEF:srecv=PREV,UN,drecv,PREV,IF,drecv,+",
        "LINE2:rrecv#$keyhelpMailgraphColor{received}:Received",
        'GPRINT:srecv:MAX:total\: %8.0lf msgs',
        'GPRINT:rrecv:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmrecv:MAX:max\: %4.0lf msgs/min\l',
    );

    RRDs::graph(
        $setOutputfile,
        '--imgformat', 'PNG',
        '--title', $setTitle,
        '--width', $setXpoints,
        '--height', $setYpoints,
        '--start', "-$setRange",
        '--end', $setEndrange,
        '--vertical-label', 'msgs/min',
        '--lower-limit', 0,
        '--units-exponent', 0,
        '--lazy',
        '--color', 'SHADEA#ffffff',
        '--color', 'SHADEB#ffffff',
        '--color', 'BACK#ffffff',
            $RRDs::VERSION < 1.2002 ? () : ( '--slope-mode'),
        @RRDArgs,
        'COMMENT: Last updated\:['.$setDate.']\r',
    );
	
	my $errorMsg = RRDs::error;
    print $errorMsg if $errorMsg;
		
	chown $keyhelpUid, $keyhelpGid, $setOutputfile;
}

sub _createKeyhelpMailgraphVirusPicture
{
	my (
        undef, $rrdfile, $rrdvirusfile, $setXpoints, $setYpoints, $setRange, $setEndrange, $setStep, $setTitle, $setOutputfile, $setDate,
		$keyhelpUid, $keyhelpGid
    ) = @_;
	
    my %keyhelpMailgraphColor = (rejected => 'AA0000', bounced => '000000', virus => 'DDBB00', spam => '999999');
	
	my @RRDArgs = (
        "DEF:rejected=$rrdfile:rejected:AVERAGE",
        "DEF:mrejected=$rrdfile:rejected:MAX",
        "CDEF:rrejected=rejected,60,*",
        "CDEF:drejected=rejected,UN,0,rejected,IF,$setStep,*",
        "CDEF:srejected=PREV,UN,drejected,PREV,IF,drejected,+",
        "CDEF:rmrejected=mrejected,60,*",
        "LINE2:rrejected#$keyhelpMailgraphColor{rejected}:Rejected",
        'GPRINT:srejected:MAX:total\: %8.0lf msgs',
        'GPRINT:rrejected:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmrejected:MAX:max\: %4.0lf msgs/min\l',

        "DEF:bounced=$rrdfile:bounced:AVERAGE",
        "DEF:mbounced=$rrdfile:bounced:MAX",
        "CDEF:rbounced=bounced,60,*",
        "CDEF:dbounced=bounced,UN,0,bounced,IF,$setStep,*",
        "CDEF:sbounced=PREV,UN,dbounced,PREV,IF,dbounced,+",
        "CDEF:rmbounced=mbounced,60,*",
        "AREA:rbounced#$keyhelpMailgraphColor{bounced}:Bounced ",
        'GPRINT:sbounced:MAX:total\: %8.0lf msgs',
        'GPRINT:rbounced:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmbounced:MAX:max\: %4.0lf msgs/min\l',

        "DEF:virus=$rrdvirusfile:virus:AVERAGE",
        "DEF:mvirus=$rrdvirusfile:virus:MAX",
        "CDEF:rvirus=virus,60,*",
        "CDEF:dvirus=virus,UN,0,virus,IF,$setStep,*",
        "CDEF:svirus=PREV,UN,dvirus,PREV,IF,dvirus,+",
        "CDEF:rmvirus=mvirus,60,*",
        "AREA:rvirus#$keyhelpMailgraphColor{virus}:Viruses ",
        'GPRINT:svirus:MAX:total\: %8.0lf msgs',
        'GPRINT:rvirus:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmvirus:MAX:max\: %4.0lf msgs/min\l',

        "DEF:spam=$rrdvirusfile:spam:AVERAGE",
        "DEF:mspam=$rrdvirusfile:spam:MAX",
        "CDEF:rspam=spam,60,*",
        "CDEF:dspam=spam,UN,0,spam,IF,$setStep,*",
        "CDEF:sspam=PREV,UN,dspam,PREV,IF,dspam,+",
        "CDEF:rmspam=mspam,60,*",
        "AREA:rspam#$keyhelpMailgraphColor{spam}:Spam    ",
        'GPRINT:sspam:MAX:total\: %8.0lf msgs',
        'GPRINT:rspam:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmspam:MAX:max\: %4.0lf msgs/min\l',
    );

    RRDs::graph(
        $setOutputfile,
        '--imgformat', 'PNG',
        '--title', $setTitle,
        '--width', $setXpoints,
        '--height', $setYpoints,
        '--start', "-$setRange",
        '--end', $setEndrange,
        '--vertical-label', 'msgs/min',
        '--lower-limit', 0,
        '--units-exponent', 0,
        '--lazy',
        '--color', 'SHADEA#ffffff',
        '--color', 'SHADEB#ffffff',
        '--color', 'BACK#ffffff',
            $RRDs::VERSION < 1.2002 ? () : ( '--slope-mode'),
        @RRDArgs,
        'COMMENT: Last updated\:['.$setDate.']\r',
    );
	
	my $errorMsg = RRDs::error;
    print $errorMsg if $errorMsg;
		
	chown $keyhelpUid, $keyhelpGid, $setOutputfile;
}

sub _createKeyhelpMailgraphGreylistPicture
{
	my (
        undef, $rrdfile, $setXpoints, $setYpoints, $setRange, $setEndrange, $setStep, $setTitle, $setOutputfile, $setDate,
		$keyhelpUid, $keyhelpGid
    ) = @_;
	
    my %keyhelpMailgraphColor = (greylisted => '999999', delayed => '006400');
	
	my @RRDArgs = (
        "DEF:greylisted=$rrdfile:greylisted:AVERAGE",
        "DEF:mgreylisted=$rrdfile:greylisted:MAX",
        "CDEF:rgreylisted=greylisted,60,*",
        "CDEF:dgreylisted=greylisted,UN,0,greylisted,IF,$setStep,*",
        "CDEF:sgreylisted=PREV,UN,dgreylisted,PREV,IF,dgreylisted,+",
        "CDEF:rmgreylisted=mgreylisted,60,*",
        "AREA:rgreylisted#$keyhelpMailgraphColor{greylisted}:Greylisted",
        'GPRINT:sgreylisted:MAX:total\: %8.0lf msgs',
        'GPRINT:rgreylisted:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmgreylisted:MAX:max\: %4.0lf msgs/min\l',

        "DEF:delayed=$rrdfile:delayed:AVERAGE",
        "DEF:mdelayed=$rrdfile:delayed:MAX",
        "CDEF:rdelayed=delayed,60,*",
        "CDEF:ddelayed=delayed,UN,0,delayed,IF,$setStep,*",
        "CDEF:sdelayed=PREV,UN,ddelayed,PREV,IF,ddelayed,+",
        "CDEF:rmdelayed=mdelayed,60,*",
        "LINE2:rdelayed#$keyhelpMailgraphColor{delayed}:Delayed   ",
        'GPRINT:sdelayed:MAX:total\: %8.0lf msgs',
        'GPRINT:rdelayed:AVERAGE:avg\: %5.2lf msgs/min',
        'GPRINT:rmdelayed:MAX:max\: %4.0lf msgs/min\l',
    );

    RRDs::graph(
        $setOutputfile,
        '--imgformat', 'PNG',
        '--title', $setTitle,
        '--width', $setXpoints,
        '--height', $setYpoints,
        '--start', "-$setRange",
        '--end', $setEndrange,
        '--vertical-label', 'msgs/min',
        '--lower-limit', 0,
        '--units-exponent', 0,
        '--lazy',
        '--color', 'SHADEA#ffffff',
        '--color', 'SHADEB#ffffff',
        '--color', 'BACK#ffffff',
            $RRDs::VERSION < 1.2002 ? () : ( '--slope-mode'),
        @RRDArgs,
        'COMMENT: Last updated\:['.$setDate.']\r',
    );
	
	my $errorMsg = RRDs::error;
    print $errorMsg if $errorMsg;
		
	chown $keyhelpUid, $keyhelpGid, $setOutputfile;
}

my $uid = getpwnam 'keyhelp';
my $gid = getgrnam 'keyhelp';
my $keyhelpHostname = `hostname -f`;
my $dayRange = 3600 * 24 * 1;
my $weekRange = 3600 * 24 * 7;
my $monthRange = 3600 * 24 * 30;
my $yearRange = 3600 * 24 * 365;
my $endrange = time;

my $mailGraphs = keyhelpMailgraph->new(
	uid => $uid,
	gid => $gid,
	keyhelpHostname => $keyhelpHostname,
	mailgraphDir => '/home/keyhelp/www/keyhelp/theme/otd/assets/img/rrd_graphs', #Pfad wo das IMG gespeichert werden soll
	mailgraphRRDFile => '/var/lib/mailgraph/mailgraph.rrd',
	mailgraphVirusRRDFile => '/var/lib/mailgraph/mailgraph_virus.rrd',
	mailgraphGreylistRRDFile => '/var/lib/mailgraph/mailgraph_greylist.rrd',
	xPoints => 540,
	pointsPerSample => 3,
	yPoints => 96,
	dayRange => $dayRange,
	weekRange => $weekRange,
	monthRange => $monthRange,
	yearRange => $yearRange,
	endrange => $endrange);

$mailGraphs->_createMailgraphDir();
$mailGraphs->_buildKeyHelpMailgraph();
$mailGraphs->_buildKeyHelpVirusMailgraph();
$mailGraphs->_buildKeyHelpGreylistMailgraph();
