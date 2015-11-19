<?php

if (isset($_POST["projectName"])) {
    $removeRaw = str_replace("_raw","",$_POST["projectName"]);
    $removeRaw = str_replace("_thmb","",$removeRaw);
    
    
    
    
    $myfile = fopen('projects/' . $removeRaw . '/' . $_POST["saveFileName"] . ".". $_POST["projectFileType"] , "w") or die("Unable to open file!");
    if(isset($_POST["fixURL"])){
        $txt = str_replace('projects/' . $removeRaw . '/', '', $_POST["projectBody"]);
        $txt = str_replace('contenteditable', '', $txt);
        //$txt = str_replace('style="display: none;"', '', $txt);
        //images/bottomShadow.png
                $txt = str_replace('images/bottomShadow.png', '../images/bottomShadow.png', $txt);

        
    }  else {
        $txt = $_POST["projectBody"];
    }
    
    print_r($txt);
    fwrite($myfile, $txt);
    fclose($myfile);
}
?>


