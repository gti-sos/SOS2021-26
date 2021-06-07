<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<main>

    <div class="card-group">
        
        <div class="card border-success mb-3" style="">
                <div class="card-header bg-transparent border-success" style="text-align: center;">Miembro</div>
                <div class="card-body text-success">
                  <!--<img src='https://pbs.twimg.com/media/Edwx26zWsAY1oaK?format=jpg&name=large' style = "max-width: 15rem; margin-bottom: 1%;"alt="">
                  <link rel='icon' type='image/jpg' href='/josemari.jpg'>-->
                  <div class="embed-responsive embed-responsive-16by9 video">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <iframe width="816" height="441" src="https://www.youtube.com/embed/aOgQgWC1TMY" frameborder="0"  allowfullscreen></iframe>
                </div>
                  <h5 class="card-title" style="padding-left: 30%; margin-top: 3%;"><a href="https://github.com/josemarimaya">José María Maya Cano </a></h5>
                  <p class="card-text">Desarrollador de la api que hace uso de la base de datos de culturaBASE
                      en su parte del proyecto podremos ver otras integraciones con otros grupos usando la misma además del uso de la biblioteca de Amchart con otras Apis Externas
                  </p>
                </div>
                <div class="card-footer bg-transparent border-success">
                    <a href="https://youtu.be/aOgQgWC1TMY" class="btn btn-info" style="margin-left: 35%;">Enlace de youtube</a>
                </div>
        </div>
        
        
        <div class="card border-success mb-3" style="">
            <div class="card-header bg-transparent border-success" style="text-align: center;">Miembro
                
            </div>
            
            <div class="card-body text-success">
                <div class="embed-responsive embed-responsive-16by9 video">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <iframe width="816" height="441" src="https://www.youtube.com/embed/-h-cvcmxTF0" frameborder="0"  allowfullscreen></iframe>
                </div>
                
              <h5 class="card-title" style="padding-left: 30%; margin-top: 3%;"><a href="https://github.com/keffren">Mateo Serna Giraldo</a></h5>
              <p class="card-text"><i>Desarrollador de la API REST: Hoslteries.<br>Interacción con servicios web en base a la recopilación de información del 
                sector de la Hostelería de España.</i>
              </p>
            </div>
    </div>
        
    </div>

    <Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/info'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Volvemos al menú principal</Button>

    <!--<div class="card-group">
        <div class="col">
            <div class="card border-success mb-3" style="max-width: 18rem;">
                <div class="card-header bg-transparent border-success">Miembro</div>
                <div class="card-body text-success">
                    <img src="" alt="">
                  <h5 class="card-title">José María Maya Cano</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="card-footer bg-transparent border-success">
                    <a href="https://www.youtube.com/watch?v=rkrsYIKMDVY" class="btn btn-info" style="margin-left: 15%;">Enlace de youtube</a>
                </div>
            </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
    </div>-->
    


</main>

<style>
    .card{
        max-height: 50rem;
        max-width: 50rem;
    }
    .card.border-success.mb-3{
        max-width: 40rem; 
        margin-left: 10%;
    }

    .card-group{
        margin-top: auto;
    }
</style>