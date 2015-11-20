<?php
if ($handle = opendir('./lib/images/ciscoIcons/')) {
    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
        echo '<img src="./lib/images/ciscoIcons/'.$entry.'"></img>';
    }
    closedir($handle);
}
?>