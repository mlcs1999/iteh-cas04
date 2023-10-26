// AJAX - asinhroni javascript i xml
console.log("Uspesno si se povezao sa js skriptom");

$("#dodajForm").submit(function(event) {
    event.preventDefault();
    console.log("Dodavanje kolokvijuma je pokrenuto.");

    const $form = $(this);
    console.log($form);

    const serijalizacija = $form.serializeArray();
    console.log(serijalizacija);

    const formData = serijalizacija.reduce(
        (json, {name, value}) => ((json[name] = value), json),
        {}
    );
    console.log(formData);

    $.ajax({
        url: "obrada.php",
        type: "post",
        data: serijalizacija,
        success: function (response) {
            const data = {
                id: response,
                ...formData,
            };
            if (!isNaN(response)) {
                console.log("Kolokvijum je zakazan");
                console.log(response);
                console.log("Data.id" + data.id);
                appandRow(data);
                $("#myModal").modal("hide");
            }
            else {
                console.log("Kolokvijum nije zakazan" + response);
            }
        },
        error: function (textStatus, errorThrown) {
            console.log("Greska:" + textStatus + " " + errorThrown);
        },
    });
});

function appandRow(data) { 

    $("#myTable tbody").append(` 
  
          <tr> 
  
              <td>${data.predmet_d}</td> 
  
              <td>${data.katedra}</td> 
  
              <td>${data.sala}</td> 
  
              <td>${data.datum}</td> 
  
              <td> 
  
                <input type="radio" name="delete-prijava" value=${data.id}>
  
              </td> 
  
              <td> 
  
                <button type="button" class="btn btn-primary izmeni">Izmeni</button> 
  
              </td> 
  
          </tr> 
  
      `); 
  } 

//   Brisanje kolokvijuma
  $("#btn-obrisi").click(function (event) { 
    event.preventDefault(); 
    console.log("Brisanje je pokrenuto"); 
    const polje = $("input[name=delete-prijava]:checked"); 
    console.log(polje);
    console.log(polje.val());

  
    $.ajax({ 
      url: "obrada.php", 
      type: "post", 
      data: { "delete-prijava": polje.val() }, 
      success: function (response) { 
        if (response === "Success") { 
          polje.closest("tr").remove(); 
          console.log("Kolokvijum je uspesno obrisan"); 
        } else { 
          console.log("kolokvijum nije uspesno obrisan " + response); 
        } 
      }, 
      error: function (textStatus, errorThrown) { 
        console.error("Greska: " + textStatus + " " + errorThrown); 
      }, 
    }); 
  }); 
  
  
