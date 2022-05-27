<section id="main_content">
    <section>
        <div class="ideaBar d-flex justify-content-between">
            <button class="myBtn-secondary" id="sync_invites"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;Sync Invitations</button>
            <i class="fa-solid fa-plus d-flex me-3" id="openInviteForm"></i>
        </div>
        <form action="" id="inviteForm" class="hidden">
            <div class="mb-3">
                <label for="invite_title" class="form-label">Title</label>
                <input type="text" class="form-control" id="invite_title">
            </div>
            <div class="mb-3">
                <label for="invite_description" class="form-label">Text</label>
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
            <div class="d-flex justify-content-between">
                <button type="submit" class="myBtn-primary" id="send_invite">Invite&nbsp;&nbsp;<i
                            class="fa-solid fa-paper-plane"></i></button>
                <button value="Cancel" id="btn_cancel" class="myBtn">Cancel</button>
            </div>
        </form>
    </section>
    <div id="invitations">

    </div>
</section>