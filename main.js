//javascript
//wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {

    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

    function getTats() {
        var formTag = document.getElementsByTagName("form"),
            selectLi = $('dropDown'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "dropDownSelect");
        for (var i = 0, j = dropDown.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = dropDown[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }


    function getSelectedRadio() {
        var radios = document.forms[0].sex;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                sexValue = radios[i].value;
            }
        }
    }

    function toggleControls(n) {
        switch (n) {
            case "on":
                $('itemForm')
                    .style.display = "none";
                $('clearData')
                    .style.display = "inline";
                $('displayData')
                    .style.display = "none";
                $('addNew')
                    .style.display = "inline";
                break;
            case "off":
                $('itemForm')
                    .style.display = "block";
                $('clearData')
                    .style.display = "inline";
                $('displayData')
                    .style.display = "inline";
                $('addNew')
                    .style.display = "none";
                $('items')
                    .style.display = "none";
                break;
            default:
                return false;

        }
    };


    function storeData(key) {
        if (!key) {
            var id = Math.floor(Math.random() * 1000000001);
        } else {
            id = key;
        }
        getSelectedRadio();
        var item = {};
            item.style = ["Style:", $('dropDownSelect').value];
            item.fname = ["First Name:", $('fname').value];
            item.lname = ["Last Name:", $('lname').value];
            item.email = ["Email:", $('email').value];
            item.sex = ["Sex:", sexValue];
            item.url = ["Website:", $('url').value];
            item.date = ["Date:", $('date').value];
            item.pain = ["Pain Tolerance:", $('pain').value];
            item.comment = ["Comments:", $('comment').value];

        localStorage.setItem(id, JSON.stringify(item));
        alert("Tattoo Appointment Made!");
    }

    function getData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There are no items saved! So default data was added!");
            autoFillData();
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items')
            .style.display = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.style[1], makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);

            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    function getImage(styName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src","images/"+ styName +".png");
        imageLi.appendChild(newImg);
    }
    //auto Populate
    function autoFillData(){
        for(var n in json){
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }

    function makeItemLinks(key, linksLi) {

        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);


        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem() {

        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off");

        $('dropDownSelect')
            .value = item.style[1];
        $('fname')
            .value = item.fname[1];
        $('lname')
            .value = item.lname[1];
        $('email')
            .value = item.email[1];
        $('url')
            .value = item.url[1];
        $('date')
            .value = item.date[1];
        $('pain')
            .value = item.pain[1];
        $('comment')
            .value = item.comment[1];

        $('saveData').removeEventListener("click", storeData);
        $('saveData').value = "Edit Item";
        var editSubmit = $('saveData');
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this item?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Item was not erased!");
        }
    }

    function deleteData() {
        var askAll = confirm("WARNING! This will delete all of your appointments! Press OK to continue.");
        if (localStorage.length === 0) {
            alert("There is no data to clear!");

        } else if (askAll) {
            localStorage.clear();
            alert("All Items Have Been Deleted!");
            window.location.reload();
            return false;
        } else {
            alert("Tattoo Appointments were not erased!");
        }
    }

    function validate(eventData) {
        //Define the elements to be checked
        var getstyle = $('dropDownSelect');
        var getfname = $('fname');
        var getlname = $('lname');
        var getemail = $('email');
        var getdate = $('date');
        var geturl = $('url');
        var getdate = $('date');
        var getpain = $('pain');
        var getcomment = $('comment');
    

        errorMsg.innerHTML = "";
        getstyle.style.border = "1px solid black";
        getfname.style.border = "1px solid black";
        getlname.style.border = "1px solid black";
        getemail.style.border = "1px solid black";
        getdate.style.border = "1px solid black";
        geturl.style.border = "1px solid black";
        getdate.style.border = "1px solid black";
        getpain.style.border = "1px solid black";
        getcomment.style.border = "1px solid black";
 
        var messageArray = [];

        if (getstyle.value === "") {
            var styleError = "Please select a style!";
            getstyle.style.border = "2px solid red";
            messageArray.push(styleError);
        }

        if (getfname.value === "") {
            var fnameError = "Please enter your first name!";
            getfname.style.border = "2px solid red";
            messageArray.push(fnameError);
        }

        if (getlname.value === "") {
            var lnameError = "Please enter your last name!";
            getlname.style.border = "2px solid red";
            messageArray.push(lnameError);

        }
        
        if (getemail.value === "") {
            var emailError = "Please enter your Email address!";
            getemail.style.border = "2px solid red";
            messageArray.push(emailError);
        }   
        
        if (geturl.value === "") {
            var urlError = "Please enter an example of your artwork!";
            geturl.style.border = "2px solid red";
            messageArray.push(urlError);

        }
        
        if (getpain.value === "") {
            var painError = "Please enter your pain tolerance!";
            getcomment.style.border = "2px solid red";
            messageArray.push(painError);

        }
        
        if (getcomment.value === "") {
            var commentError = "Please enter your last name!";
            getcomment.style.border = "2px solid red";
            messageArray.push(commentError);

        }

        
        if (getdate.value === "") {
            var date = "Please enter the date you would like to make your appointment!";
            getdate.style.border = "2px solid red";
            messageArray.push(dateError);
        }

        if (messageArray.length >= 1) {
            for (var i = 0, j = messageArray.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageArray[i];
                errorMsg.appendChild(txt);
            }
            eventData.preventDefault();
            return false;
        } else {

            storeData(this.key);
        }


    }

    function clearData() {
        if (localStorage.length === 0) {
            alert("There is no data to clear!");

        } else {
            localStorage.clear();
            alert("All Items Have Been Deleted!");
            window.location.reload();
            return false;
        }
    }
    var dropDown = ["--Choose A Style--", "Color", "Grey", "Outline"];
    var sexValue;
    var errorMsg = $('errors');
    getTats();
    var displayData = $('displayData');
    displayData.addEventListener("click", getData);
    var clearData = $('clearData');
    clearData.addEventListener("click", deleteData);
    var save = $('saveData');
    save.addEventListener("click", storeData);
})







