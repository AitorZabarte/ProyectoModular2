let boton_form = document.getElementById('boton_form');
boton_form.addEventListener('click', search);
var preferencias_del_usuario=[]
function search(){
    let nombre= document.getElementById('nombre').value
    let capital= document.getElementById('capital').value
    let nombre_completo= document.getElementById('nombre_completo').value
    let region= document.getElementById('region').value
    let nombre_radio= document.getElementById('nombre_radio')
    let capital_radio= document.getElementById('capital_radio')
    let nombre_completo_radio= document.getElementById('nombre_completo_radio')
    let string_api
    if(nombre!=""&&nombre_radio.checked!=false||capital!=""&&capital_radio.checked!=false||nombre_completo!=""&&nombre_completo_radio.checked!=false||region!=""&&region_radio.checked!=false){
        while( table.rows.length > 1) table.rows[1].remove();
        if(nombre_radio.checked==true&&nombre!=""){
            string_api=`name/${nombre}`
        }
        else if(capital_radio.checked==true&&capital!=""){
            string_api=`capital/${capital}`
        }
        else if(nombre_completo_radio.checked==true&&nombre_completo!=""){
            string_api=`name/${nombre_completo}?fullText=true`
        }
        else if(region_radio.checked==true&&region!=""){
            string_api=`region/${region}`
        }
        preferencias_del_usuario.length=0
        axios.get(`https://restcountries.eu/rest/v2/${string_api}`)
        .then(function (response) {
            for(var i=0;i<response.data.length;i++){
                var table=document.getElementById('table')
                var fila=document.createElement('tr')
                var columna_uno=document.createElement('td')
                var columna_dos=document.createElement('td')
                var columna_tres=document.createElement('td')
                var columna_cuatro=document.createElement('td')
                var columna_cinco=document.createElement('td')
                var columna_seis=document.createElement('td')
                var columna_siete=document.createElement('td')
                var bandera_imagen=document.createElement('img')
                var Favoritos = document.createElement("INPUT");
                Favoritos.setAttribute("type", "checkbox");
                let pais_nombre=response.data[i].name
                let pais_capital=response.data[i].capital
                let pais_bandera=response.data[i].flag
                let pais_region=response.data[i].region
                let pais_moneda=response.data[i].currencies[0].name
                let pais_idioma=response.data[i].languages[0].name
                bandera_imagen.src=pais_bandera
                Favoritos.setAttribute('id',`${i}`)
                Favoritos.addEventListener('change',Intro_favorito)
                columna_uno.appendChild(document.createTextNode(`${pais_nombre}`))
                columna_dos.appendChild(document.createTextNode(`${pais_capital}`))
                columna_tres.appendChild(document.createTextNode(`${pais_region}`))
                columna_cinco.appendChild(document.createTextNode(`${pais_idioma}`))
                columna_seis.appendChild(document.createTextNode(`${pais_moneda}`))
                columna_siete.appendChild(Favoritos)
                bandera_imagen.height="20"
                bandera_imagen.width="30"
                columna_cuatro.appendChild(bandera_imagen)
                fila.appendChild(columna_uno)
                fila.appendChild(columna_dos)
                fila.appendChild(columna_tres)
                fila.appendChild(columna_cuatro)
                fila.appendChild(columna_cinco)
                fila.appendChild(columna_seis)
                fila.appendChild(columna_siete)
                table.appendChild(fila)
                console.log(response);
                preferencias_del_usuario.push([pais_nombre,pais_capital,Favoritos.id,pais_region,pais_idioma,pais_moneda])
            }
        })
    .catch(function (error) {
    alert('La palabra introducida en la categoria seleccionada no existe')
     })       
  }
  else{
    alert('No has especificado el campo que quieres buscar o no has escrito nada')
  }
}
function Intro_favorito() {
    var pais_repetido=false 
            for(let j=0;j<preferencias_del_usuario.length;j++)
            {
                if(document.getElementById(preferencias_del_usuario[j][2]).checked)
                {   
                    for(let k=0;k<localStorage.length;k++)
                    {
                        let elementos_guardados=JSON.parse(localStorage.getItem(k))
                        if(preferencias_del_usuario[j][0]==elementos_guardados.Nombre){
                            pais_repetido=true
                        }
                    }
                    if(pais_repetido){
                        console.log('pais repetido')
                    }
                    else{
                        localStorage.setItem(`${localStorage.length}`,JSON.stringify({Nombre: `${preferencias_del_usuario[j][0]}`,Capital: `${preferencias_del_usuario[j][1]}`,Continente: `${preferencias_del_usuario[j][3]}`,Idioma: `${preferencias_del_usuario[j][4]}`,Moneda: `${preferencias_del_usuario[j][5]}`}))
                    }
                    setTimeout(function(){ document.getElementById(preferencias_del_usuario[j][2]).checked=false},300)
                }     
            }
}
window.onload=function(){
    let boton_borrar = document.getElementById('borrar');
    boton_borrar.addEventListener('click', function(){localStorage.clear()});
    for(let k=0;k<localStorage.length;k++){
        var tabla_favoritos=document.getElementById('tabla_favoritos')
        let fila_favoritos =document.createElement('tr')
        let celda_uno= document.createElement('td')
        let celda_dos=document.createElement('td')
        let celda_tres=document.createElement('td')
        let celda_cuatro=document.createElement('td')
        let celda_cinco=document.createElement('td')
        let elementos_guardados=JSON.parse( localStorage.getItem(k))
        celda_uno.appendChild(document.createTextNode(`${elementos_guardados.Nombre}`))
        celda_dos.appendChild(document.createTextNode(`${elementos_guardados.Capital}`))
        celda_tres.appendChild(document.createTextNode(`${elementos_guardados.Continente}`))
        celda_cuatro.appendChild(document.createTextNode(`${elementos_guardados.Idioma}`))
        celda_cinco.appendChild(document.createTextNode(`${elementos_guardados.Moneda}`))
        fila_favoritos.appendChild(celda_uno)
        fila_favoritos.appendChild(celda_dos)
        fila_favoritos.appendChild(celda_tres)
        fila_favoritos.appendChild(celda_cuatro)
        fila_favoritos.appendChild(celda_cinco)
        tabla_favoritos.appendChild(fila_favoritos)
    }
}
