const include = {

    //Liste des scripts
    listScripts: [
        "easyfunction",
        "canvas",
        "circle",
        "rect",
        "control"
    ],
    
  
    //On continu que s'il y a au moins un script
    init : function () {

        //On compte le nombre de scripts
        const lengthScripts = this.listScripts.length;
        
        if (lengthScripts > 0) {
            //On charge les scripts avec une boucle
            for(let i=0;i<lengthScripts;i++)
            {
                this.getScriptAsync('assets/js/modules/'+this.listScripts[i]+'.js', () => {
                console.log('The script load is done.');
                });

            }
        }
        include.getScriptDefer('assets/js/app.js', () => {
            app.init();
            console.log('The script load is done.');
        });
        
    },
    getScriptAsync : function (scriptUrl, callback) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = callback;
        script.async = true;
        document.body.appendChild(script);
    },
    getScriptDefer : function (scriptUrl, callback) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = callback;
        script.defer = true;
        document.body.appendChild(script);
    },
}
include.init();

