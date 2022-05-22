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
            <input type="url" id="idea_link" name="homepage" class="form-control">
        </div>
        <div class="mb-3">
            <input type="file" value="media" id="post_media" class="form-control">
        </div>
        <button type="submit" value="Abschicken" id="btn_submit_idea" class="myBtn-primary">Senden&nbsp;&nbsp;<i class="fa-solid fa-paper-plane"></i></button>
    </form>


    <div id="dateIdeas">

    </div><!--<div id="dateIdeas" class="flex-center-column-95vw">

    </div>-->
</section>