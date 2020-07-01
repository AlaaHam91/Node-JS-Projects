let CustomerViewModel = {
  customersData: ko.observableArray([]),
};
function ConvertBinary2Url(binaryData) {
  var base64 = btoa(String.fromCharCode.apply(null, binaryData));
  var url = "data:image/jpeg;base64," + base64;
  // console.log(url);
  return url;
}
var server_path = "http://localhost:8081/";

refreshData = () => {
  $.getJSON(
    "http://localhost:8081/countryCustomers/getAllCustomers/all",
    (data) => {
      data.customersData.forEach((country) => {
        country.customers.forEach((customer) => {
          if(customer.custImg!=undefined)
          {
          //  customer.custImg=ConvertBinary2Url(customer.custImg.data);

          //by uploaded img
          customer.custImg =
            "http://localhost:8081/images/" + customer.custNo + ".jpg";
          }
          else
          customer.custImg =
          server_path + 'images/non.jpg';
        });
      
      });
      CustomerViewModel.customersData(data.customersData);
    }
  );
};
$("#countryForm").submit((event) => {
  event.preventDefault();
  var country = $("#country").val();

  // var posting = $.post(url, { country: country });

  // posting.done((res) => {
  //   if (res.success) {
  //     $("#msg").empty().append(res.msg);
  //      refreshData();
  //   } else $("#msg").empty().append("no data found");
  // });

  var opType = $("#formOperationType").val(),
  country_id = $("#countryID").val();

  if (opType == "add") url = server_path + "countryCustomers/countryCreate";
  else if ((opType == "update"))
    url = server_path + "countryCustomers/" + country_id + "/update";

  $.ajax({
    url: url,
    data: {_id:country_id,country:country},
    type:(opType=='add')? "POST":"PUT",
    success: (res, textStatus, xhr) => {
      $("#msg").empty().append(res.msg);
      refreshData();
    },
    error: (xhr, textStatus, error) => {
      $("#msg").empty().append("no data found");
    },
  });
});

$("#customerForm").submit((event) => {
  event.preventDefault();
  var 
      opType = $("#cf_formOperationType").val(),
     // country_id = $("#cf_countryID").val(),
      customer_id = $("#cf_customerID").val(),
      customerCountry=$("#customerCountry").val(),
      title=$("#title").val(),
      custNo=$("#custNo").val(),
      custName=$("#custName").val(),
      gender=$("#gender").val(),
      phone=$("#phone").val(),
      email=$("#email").val(),
      url = server_path+'countryCustomers/';
      url+=(opType=='add')? 'addCustomer/'+ customerCountry : 'updateCustomer/'+customerCountry+'/'+custNo+'/update';
     var jsonData={custNo:custNo,custName:custName,gender:gender,phone:phone,email:email,title:title}
  $.ajax({
    url: url,
    data: jsonData,
    type:"PUT",
    success: (res, textStatus, xhr) => {
      $("#custMsg").empty().append(res.msg);

//upload customer image
      let imgForm=new FormData();
      let image= $("#image").prop("files")[0];
      if($("#image").prop("files").length>0)
      {
        imgForm.append("imgFile",image);
        let imgUrl=server_path+'countryCustomers/addCustomerImg/'+customerCountry+'/'+custNo;
        $.ajax({
          url: imgUrl,
          processData:false,
          contentType:false,
          type: "PUT",
          data: imgForm,
          success: (res, textStatus, xhr) => {
            $("#custMsg").append(res.msg);
            $("#customerModal").modal("toggle")
            refreshData();

          },
          error: (xhr, textStatus, error) => {
            $("custMsg").append("</br> error in upload the img : </br>" + error);
          },
        });
      }

    },
    error: (xhr, textStatus, error) => {
      $("#custMsg").empty().append("error in"+opType+" customer:"+error);
    },
  });
});

let setAddCountryModal = () => {
  $("#countryModalTitle").empty().append("Add new country");
  $("#formOperationType").val("add");
  $("#countryID").val("");

};
let setEditCountryModal = (id, country) => {
  $("#countryModalTitle").empty().append("Update country");
  $("#formOperationType").val("update");
  $("#country").val(country);
  $("#countryID").val(id);
};

let setEditCustomerModal = (country_id,customer_id,custNo,custName,title,gender,phone,email) => {
  $("#customerModalTitle").empty().append("Update customer info:");
  $("#cf_formOperationType").val("update");
  $("#cf_customerID").val(customer_id),
  $("#customerCountry").val(country_id),
  $("#title").val(title),
  $("#custNo").val(custNo),
  $("#custName").val(custName),
  $("#gender").val(gender),
  $("#phone").val(phone),
  $("#email").val(email)
};

 let setAddCountryCustomerModal=()=>{
  $("#customerModalTitle").empty().append("Add new customer");
  $("#cf_formOperationType").val("add");
  $("#cf_countryID").val("");
  $("#cf_customerID").val("");

 };

let setRemoveModal = (type, id, parentid) => {
  $("#deleteType").val(type);
  $("#deleteid").val(id);
  $("#parentid").val(parentid);
};

$("#removeForm").submit((event) => {
  event.preventDefault();
  var parentid = $("#parentid").val(),
    id = $("#deleteid").val(),
    type = $("#deleteType").val(),
    url = server_path;

  if (type == "country") {
    url = url + "countryCustomers/" + id + "/delete";
    console.log(url);
  } else if (type == "customer")
    url = url + "countryCustomers/deleteCustomer/" +parentid+'/'+ id + "/delete";

  $.ajax({
    url: url,
    type: "DELETE",
    data: "noData",
    success: (res, textStatus, xhr) => {
      $("#deleteModal").modal("toggle");
      refreshData();
    },
    error: (xhr, textStatus, error) => {
      $("removeMsg").val("No data removed, error is : </br>" + error);
    },
  });
});
refreshData();

ko.applyBindings(CustomerViewModel);
