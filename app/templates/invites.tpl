<section id="main_content">
    <section>
        <!--{*<form action="">
            <label for="invite_title">Titel</label>
            <input type="text" id="invite_title"><br>
            <label for="invite_text">Invite text:</label>
            <textarea name="inviteText" id="invite_text" rows="5" cols="35"></textarea><br>
            <label><input type="file" value="media" id="post_media"></label><br>
            <button type="submit" value="Abschicken" id="btn_submit_invite" class="myBtn myBtn-primary">Senden&nbsp;&nbsp;<i class="fa-solid fa-paper-plane"></i></button>
        </form>*}-->
        <form action="" id="inviteForm">
            <div class="mb-3">
                <label for="invite_title" class="form-label">Title</label>
                <input type="text" class="form-control" id="invite_title">
            </div>
            <div class="mb-3">
                <label for="invite_description" class="form-label">Description</label>
                <textarea class="form-control" id="invite_description" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <label for="meeting_link" class="form-label">Meeting Link</label>
                <input type="text" id="meeting_link" name="homepage" class="form-control">
            </div>
            <div class="mb-3">
                <label for="invite_dateTime" class="form-label">Date & Time:</label>
                <input type="datetime-local" id="invite_dateTime" name="homepage" class="form-control">
            </div>
            <button type="submit" class="myBtn-primary" id="send_invite">Invite&nbsp;&nbsp;<i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <button id="test_notification">Test</button>
        <!--<form>
            <div class="mb-3">
                <label for="invite_title" class="form-label">Title</label>
                <input type="text" class="form-control" id="invite_title" aria-describedby="title for Invitation">
            </div>
            <div class="mb-3">
                <label for="invite_text" name="inviteText" class="form-label">Invitation Text:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Senden&nbsp;&nbsp;<i class="fa-solid fa-paper-plane"></i></button>
        </form>-->
    </section>
    <div id="invitations">

    </div>
</section>