<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select uid,name,password,email,created,status from customers_auth where phone='$email' or email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['created'];
        $response['status_s'] = $user['status'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        $_SESSION['status_s'] = $user['status'];
        
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});

$app->post('/updPass', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->profile->pass_word;
    $email = $r->profile->email;
    $user = $db->getOneRecord("select uid,name,password,email,created,status from customers_auth where phone='$email' or email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Password match.';
        } else {
            $response['status'] = "error";
            $response['message'] = 'Incorrect password';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user';
        }
    echoResponse(200, $response);
});

$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'name', 'password'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $phone = $r->customer->phone;
    $name = $r->customer->name;
    $email = $r->customer->email;
    $address = $r->customer->address;
    $password = $r->customer->password;
    $thread_id = $r->customer->thread_id;
    
    $isUserExists = $db->getOneRecord("select 1 from customers_auth where phone='$phone' or email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "customers_auth";
        $column_names = array('phone', 'name', 'email', 'password', 'city', 'address','thread_id','thread_pos','thread_g');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            $db->updateRecord("update customers_auth SET creaed_by=".$thread_id." WHERE uid=".$result."");

            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['phone'] = $phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            $_SESSION['status_s'] = 'inactive';
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->post('/onInitLoad', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $allCustomer = $db->getAllRecord("select * from customers_auth");
    if($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }else{
       require_once 'passwordHash.php';
       $admPass = passwordHash::hash('admin');
    //    $db->updateRecord(" `transaction_table` ADD CONSTRAINT `transaction_table_ibfk_1`  FOREIGN KEY (`customer_auth_id`) REFERENCES `customers_auth`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE");
       $db->updateRecord("insert into customers_auth (`uid`, `name`, `email`, `phone`, `password`, `address`, `city`,`sponsorid`,`status`,`thread_g`) VALUES (1, 'admin', 'umarleys@gmail.com', '0768351958', '$admPass', '4092 Mbeya City', 'Mbeya','NTM-0','0','1')");
    }
      echoResponse(200, $response); 
    
});

$app->post('/feesPayments', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $payment_amt=$r->payment_amt;
    $pay_id=$r->pay_id;

    $feesPayments =  $db->updateRecord("update customers_auth SET status='1', joining_fees=".$payment_amt." WHERE uid=".$pay_id."");
    if($feesPayments){
        $response["status"] = "success";
        $response["message"] = "Transaction verified and fees added";
    }else{
        $response["status"] = "error";
        $response["message"] = "Failed . Please try again"; 
    }
      echoResponse(200, $response); 
});


$app->post('/loadAllSponsor', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $limit=$r->limit;
    $allCustomer = $db->getAllRecord("select * from customers_auth where max_user< 3");
    while($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }
      echoResponse(200, $response); 
    
});

$app->post('/loadAllSponsorall', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $limit=$r->limit;
    $allCustomer = $db->getAllRecord("select * from customers_auth");
    while($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }
      echoResponse(200, $response); 
    
});

$app->post('/updUser', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $profile_id=$r->profile->status;
    $uid_id=$r->profile->uid;

    $allCustomer =  $db->updateRecord("update customers_auth SET status=".$profile_id." WHERE uid=".$uid_id."");
    if($allCustomer){
        $response["status"] = "success";
        $response["message"] = "Updated succefully";
    }else{
        $response["status"] = "error";
        $response["message"] = "Failed to to update. Please try again"; 
    }
      echoResponse(200, $response); 
    
});

$app->post('/deleteSponsor', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $uid_id=$r->profile->uid;
    $allCustomer =  $db->updateRecord("delete from customers_auth WHERE uid=".$uid_id."");

    if($allCustomer){
        $response["status"] = "success";
        $response["message"] = "Deleted succefully";
    }else{
        $response["status"] = "error";
        $response["message"] = "Failed to to delete. Please try again"; 
    }
      echoResponse(200, $response); 
    
});



$app->post('/loadSponsor', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $sponsor_id=$r->id;
    // $thread_g=$r->thread_g;
    $allCustomer = $db->getAllRecord("select COUNT(uid) AS total_sponsor from customers_auth WHERE thread_id=".$sponsor_id." GROUP BY thread_id");
    if($result = $allCustomer->fetch_assoc()){
        $total = $result['total_sponsor'];
            $db->updateRecord("update customers_auth SET max_user=".$total." WHERE uid=".$sponsor_id."");
        }
        //     $db->updateRecord("insert into thread_tb(thread_id, thread_no) VALUES ('$sponsor_id','$thread_g')");
        echoResponse(200,  $response); 
     
  });

$app->post('/loadSponsorOneData', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $sponsor_id=$r->id;
    $allCustomer = $db->getAllRecord("select * from customers_auth WHERE uid=".$sponsor_id."");
    while($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }
      echoResponse(200, $response); 
});

$app->post('/loadSponsorGroupData', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $sponsor_id=$r->id;
    $createdby=$r->createdby;
  
        $allCustomer = $db->getAllRecord("select * from customers_auth WHERE thread_g >'$sponsor_id'  AND creaed_by='$createdby'");
  
    while($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }
      echoResponse(200, $response); 
});

$app->post('/loadSponsorGroupData1', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $sponsor_id=$r->id;
        $allCustomer = $db->getAllRecord("select * from customers_auth WHERE thread_g >'$sponsor_id'");
    while($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }
      echoResponse(200, $response); 
});

$app->post('/loadMyteam', function() use ($app) {
    $r = json_decode($app->request->getBody());
    $response = array();
    $db = new DbHandler();
    $sponsor_id=$r->id;
    $allCustomer = $db->getAllRecord("select * from customers_auth WHERE thread_id=".$sponsor_id."");
    while($result = $allCustomer->fetch_assoc()){
        $response[] = $result;
    }
      echoResponse(200, $response); 
});

?>