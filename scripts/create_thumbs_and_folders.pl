#!/usr/bin/perl
use Image::Magick;
use Mojo::SQLite;
use Data::Dumper;
use File::Basename ;
use Mojo::JSON qw(decode_json encode_json);
use File::Path;
use Encode;
use File::Copy ;
use File::Type;

$image = Image::Magick->new;
$ft  = File::Type->new();

unless ($ENV{"BATCH_ENV"}) {
  print("ERROR:Please export BATCH_ENV variable !");
  die;
}
$env = $ENV{"BATCH_ENV"} ;

$uploadDir= "/home/golanh/hapi-teachers/upload/" . $env ;

$sql = Mojo::SQLite->new('/home/golanh/hapi-teachers/db/app.' .$env . '.db' ) ;
$sql->options({sqlite_unicode      => 0});

$zip_file = $ARGV[0] or die "USAGE : $0 <zip file>" ;

$base_zip_file = basename($zip_file);
`rm -fR /home/golanh/hapi-teachers/data/files/*`;
`unzip  $ARGV[0] -d /home/golanh/hapi-teachers/data/files` ;
`find /home/golanh/hapi-teachers/data/files -type f    > allfiles.txt` ;

 open(my $fh, "<:encoding(UTF-8)", 'allfiles.txt');
while ( $f=<$fh>) {
chomp $f ;

 $basename = basename  $f;
 $dir = dirname $f ;
 ($props_path) = $dir=~ /data\/(.+)/;

$cat3 = basename $props_path;
$cat2 = basename(dirname $props_path);
$cat1 = basename(dirname dirname $props_path);

 $data->{props}->{$props_path}->{cnt}++;
 @props_arr = split("\/",$props_path);
 $props =  { cat1 => [($cat1 || "כללי")] ,cat2=>[($cat2|| "כללי")],cat3=>[($cat3||"כללי")]};
 $data->{props}->{$props_path}->{folders}->{dir}  = $dir;
 $data->{props}->{$props_path}->{folders}->{props}  = '{}';#encode_json($props);

 push @{$data->{props}->{$props_path}->{folders}->{files}},{basename=>$basename ,fullpath=>$f};


}


$sql->db->delete('docs_group') ;
$sql->db->delete('docs') ;

foreach $k ( keys %{ $data->{props}  }) {

  $idx++ ;
  $folders->{$idx} = $data->{props}->{$k}->{folders};
  $sql->db->insert('docs_group',{batch_id=>$idx,description=>$k,content=>"",created_by=>"1",props=>$folders->{$idx}->{props}}) ;


  $docs_path =   $folders->{$idx}->{dir} ;
  $folder_path = $uploadDir."/".$idx ;
  mkpath($folder_path) ;
  foreach $f (  @ { $folders->{$idx}->{files} }) {
  $type =    $ft->mime_type($f->{fullpath}) ;
  if($type =~ /image/) {
    print $type, "\n";
    $thumbs_dir = $uploadDir."/". $idx ."/thumbs/" ;
    mkpath($thumbs_dir);
    $image = Image::Magick->new;
    $image->Read($f->{fullpath});
    $image->Resize(geometry=>'200x200!');
    $image->Write($thumbs_dir .$f->{basename} );
  }
  move $f->{fullpath} , $uploadDir."/".$idx;
  $sql->db->insert('docs',{path=>$uploadDir."/".$idx ,
                              filename=>$f->{basename},
                              batch_id=> $idx ,
                              created_by=>1
                              })
  }
}


#$x = $image->Read('girl.png', 'logo.png', 'rose.png');
#warn "$x" if "$x";
