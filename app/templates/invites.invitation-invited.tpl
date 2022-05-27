<div class="row">
    <div class="col-4 col-md-2 flex-center-center">
        <!--<img src="<&>ph<&>" alt="" class="rounded img-fluid my-2 letter">-->
        <img src="<&>ph<&>" alt="" class="rounded img-fluid my-2 inviteImg" data-bs-toggle="modal" data-bs-target="#modal-<&>id<&>">
    </div>
    <div class="col-md-9 col-8 flex-center-start-column">
        <h2 class="pt-3"><&>title<&></h2>
        <i class="fa-regular fa-circle-check acceptCheck"></i>
        <a href="<&>link<&>" class="d-flex mb-2"><&>link<&></a>
        <p><&>date<&></p>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modal-<&>id<&>" tabindex="-1" aria-labelledby="open date invitation" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><&>title<&></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div><&>text<&></div>
                    <a href="<&>link<&>" class="d-flex mb-2"><&>link<&></a>
                    <p><&>date<&></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary closeBtn" data-bs-dismiss="modal" id="closeBtn" data-id="<&>id<&>">Close</button>
                    <button type="button" class="btn btn-secondary acceptBtn"  data-bs-dismiss="modal" data-id="<&>id<&>">Accept</button>
                </div>
            </div>
        </div>
    </div>

</div>
