import { __ } from '@converse/headless/i18n';
import { html } from "lit-html";
import { modal_close_button, modal_header_close_button } from "./buttons"
import { repeat } from 'lit-html/directives/repeat.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

const i18n_save = __('Save');
const i18n_cancel = __('Cancel');
const i18n_commands_found = __('Commands found');
const i18n_no_commands_found = __('No commands found');


const tpl_command_form = (o, command) => html`
    <form class="converse-form" autocomplete="off" @submit=${o.submitConfigForm}>
        <fieldset class="form-group">
            <legend>${o.title}</legend>
            ${ (o.title !== o.instructions) ? html`<p class="form-help">${o.instructions}</p>` : '' }
            <!-- Fields are generated internally, with xForm2webForm -->
            ${ command.fields.map(field =>  unsafeHTML(field)) }
        </fieldset>
        <fieldset>
            <input type="submit" class="btn btn-primary" value="${i18n_save}">
            <input type="button" class="btn btn-secondary button-cancel" value="${i18n_cancel}" @click=${o.closeConfigForm}>
        </fieldset>
    </form>
`;


const tpl_command = (o, command) => html`
    <li class="room-item list-group-item">
        <div class="available-chatroom d-flex flex-row">
            <a class="open-room available-room w-100"
               @click=${o.toggleCommandForm}
               data-command-node="${command.node}"
               data-command-jid="${command.jid}"
               data-command-name="${command.name}"
               title="${command.name}"
               href="#">${command.name || command.jid}</a>
        </div>
        ${ command.show_form ? tpl_command_form(o, command) : '' }
    </li>
`;


export default (o) => html`
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="room-details-modal-label">${o.display_name}</h5>
                ${modal_header_close_button}
            </div>
            <div class="modal-body">
                <ul class="list-group">
                    <li class="list-group-item active">${ o.commands.length ? i18n_commands_found : i18n_no_commands_found }:</li>
                    ${repeat(o.commands, item => item.jid, item => tpl_command(o, item))}
                </ul>
            </div>
            <div class="modal-footer">${modal_close_button}</div>
        </div>
    </div>
`;
