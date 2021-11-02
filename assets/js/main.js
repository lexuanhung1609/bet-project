const copyPassword = () => {
    let copyPassword = document.getElementById('temp-password');
    copyPassword.select();
    copyPassword.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyPassword.value);
    let show = document.getElementById('show-copied');

    if (show.style.display !== 'inline-block') {
    show.style.display = 'inline-block';
    }
    setTimeout(() => {
    show.style.display = 'none';
    }, 1300);
};
