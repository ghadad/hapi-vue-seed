#!/usr/bin/perl
use Image::Magick;
use Mojo::SQLite;

my $sql = Mojo::SQLite->new('sqlite:test.db');

print $sql->db->query('select sqlite_version() as version')->hash->{version};


$image = Image::Magick->new;


$x = $image->Read('girl.png', 'logo.png', 'rose.png');
warn "$x" if "$x";

