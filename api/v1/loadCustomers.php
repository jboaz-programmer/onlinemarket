<?php
  include 'dbConnect.php';
  $db = new dbConnect();
  $con = $db->connect();

  $sel = mysqli_query($con,"select * from customers_auth");
  $data = array();
  
  while ($row = mysqli_fetch_array($sel)) {
   $data[] = $row;
  }
  echo json_encode($data);

?>