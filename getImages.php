<?php
if ($handle = opendir('images/ciscoIcons/')) {
    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
        echo '<img src="images/ciscoIcons/'.$entry.'"></img>';
    }
    closedir($handle);
}
?>