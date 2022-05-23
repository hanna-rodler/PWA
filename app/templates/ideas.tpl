<section id="main_content">
    <!--<form action="">
        <label for="idea_title">Titel</label>
        <input type="text" id="idea_title"><br>
        <label for="idea_description">Invite text:</label>
        <textarea name="inviteText" id="idea_description" rows="5" cols="35"></textarea><br>
        <label for="idea_link" class="form-label">Link</label>
        <input type="url" id="idea_link" name="homepage" class="form-control"><br>
        <label><input type="file" value="media" id="post_media"></label><br>
        <button type="submit" value="Abschicken" id="btn_submit_invite" class="myBtn myBtn-primary">Senden&nbsp;&nbsp;<i class="fa-solid fa-paper-plane"></i></button>
    </form>-->
    <form action="">
        <div class="mb-3">
            <label for="idea_title" class="form-label">Title</label>
            <input type="text" class="form-control" id="idea_title">
        </div>
        <div class="mb-3">
            <label for="idea_description" class="form-label">Description</label>
            <textarea class="form-control" id="idea_description" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label for="idea_link" class="form-label">Link</label>
            <input type="text" id="idea_link" name="homepage" class="form-control">
        </div>
        <div class="mb-3">
            <input type="file" value="media" id="post_media" class="form-control">
        </div>
        <div class="mb-1">
            <p class="mb-1">Categories:</p>
            <input class="form-check-input" type="checkbox" name="categories[]" value="6" id="flexCheckDefault">
            <label class="form-check-label me-2" name="categories[]" for="flexCheckDefault">
                art
            </label>
            <input class="form-check-input" type="checkbox" name="categories[]" value="4" id="flexCheckChecked">
            <label class="form-check-label me-2" for="flexCheckChecked">
                games
            </label>
        </div>
        <div class="mb-3">
            <input class="form-check-input" type="checkbox" name="categories[]" value="5" id="flexCheckChecked">
            <label class="form-check-label me-2" for="flexCheckChecked">
                getting to know each other
            </label>
            <input class="form-check-input" type="checkbox" name="categories[]" value="7" id="flexCheckChecked">
            <label class="form-check-label" for="flexCheckChecked">
                movies
            </label>
        </div>
        <button type="submit" value="Abschicken" id="btn_submit_idea" class="myBtn-primary">Senden&nbsp;&nbsp;<i
                    class="fa-solid fa-paper-plane"></i></button>
    </form>


    <div id="dateIdeas">

    </div><!--<div id="dateIdeas" class="flex-center-column-95vw">

    </div>-->
</section>