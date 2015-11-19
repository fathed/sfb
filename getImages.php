<?php


if ($handle = opendir('images/ciscoIcons/')) {
  //  echo "Directory handle: $handle\n";
   // echo "Entries:\n";

    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
        echo '<img src="images/ciscoIcons/'.$entry.'"></img>';
    }

    /* This is the WRONG way to loop over the directory. */
   // while ($entry = readdir($handle)) {
       // echo "$entry\n";
   // }

    closedir($handle);
}


/*
$dir    = '/images/ciscoIcons';
$files1 = scandir($dir);
//$files2 = scandir($dir, 1);

print_r($files1);
//print_r($files2);*/
?>