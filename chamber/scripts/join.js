        const openDialogBtn = document.getElementById('openDialogBtn');
        const closeDialogBtn = document.getElementById('closeDialogBtn');
        const infoDialog = document.getElementById('infoDialog');


        openDialogBtn.addEventListener('click', () => {
            infoDialog.showModal();
        });

        closeDialogBtn.addEventListener('click', () => {
            infoDialog.close();
        });

        infoDialog.addEventListener('click', (event) => {
            if (event.target === infoDialog) {
                infoDialog.close();
            }
        });
