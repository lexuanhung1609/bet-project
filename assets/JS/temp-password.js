
let counter = 0;
function randomPassword(){
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-?";
    let passwordLength = 14;
    let password = "";
    
    if (counter < 1)
    {
        for (var i = 0; i < passwordLength; i++) {
            var randomNum = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNum, randomNum+1);
        }
        document.getElementById("temp-password").value = password;
        counter++;
    }
}

function copyPassword() {
    let copyPassword = document.getElementById("temp-password");
    copyPassword.select();
    copyPassword.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyPassword.value);
    let show = document.getElementById("show-copied");

    if ((show.style.display != "none")&&(counter == 1)) {
        show.style.display = "inline-block";
    }

}
