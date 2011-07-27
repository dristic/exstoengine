<div class='mainInfo'>

    <div class="form-header">Exsto Engine Beta Terms of Use</div>
	<p>Please read and agree to the terms of use below before proceeding to the download page.</p>
	
	<div id="infoMessage"><?php echo $message; ?></div>

<div style="height: 300px; overflow: scroll; padding: 10px; border: 1px solid #CCC">
	<h3>Exsto Engine Beta Terms of Use</h3>

	Shadow Rule, LLC, an Arizona Limited Liability Company ("Shadow Rule") is providing you ("the User") with the Exsto Engine Beta ("Software"), which is a preleased version of the software for testing and feedback purposes only. In addition to the Exsto Engine Terms of Use, by using this software you agree to the following:
	<br/>
	<br/>
	<b>1. Agreement Not to Disclose Confidential Information.</b> I acknowledge that Shadow Rule may disclose to me or give me access to confidential information so that I may perform my testing duties. I agree that the confidential information includes Shadow Rules's trade secrets, intellectual property, and opportunities for new or developing business. This confidential information may be contained in written materials, such as computer hardware and software, disks, documents, files, drawings, and product specifications. It may also consist of unwritten knowledge, including ideas, research, processes, practices, or know-how. While I am testing the Software, and afterward, I will not use or disclose to any other person or entity any confidential information or materials (either written or unwritten) except when I am required to do so to properly perform my duties to Shadow Rule or as required by law.
Information in the public domain, information generally known in the trade, and information that I acquire completely independently of my services for Shadow Rule is not considered to be confidential.
	<br/>
	<br/>
	<b>2. Return of Confidential Information.</b> While I am testing the Software and afterward, I will not, except in performing my duties, remove or copy any confidential information or materials or assist anyone in doing so without Shadow Rule's written permission. Upon termination of the testing program, or any time that Shadow Rule requests it, I agree to return all confidential information and materials back to Shadow Rule.
	<br/>
	<br/>
	<b>3. Right to an Injunction.</b> I acknowledge that in addition to receiving or having access to confidential information as part of testing, I will be in a position of confidence and trust with Shadow Rule and other testers. I acknowledge and agree that if I breach or threaten to breach any of the terms of this agreement, Shadow Rule will sustain irreparable harm and that Shadow Rule will be entitled to obtain an injunction to stop any breach or threatened breach of this agreement.
	<br/>
	<br/>
	<b>4. Reasonableness.</b> I acknowledge that the restrictions in this agreement are reasonable and necessary to protect Shadow Rule and its confidential information.
	<br/>
	<br/>
	<b>5. Liability.</b> I understand that the Software is provided AS IS and I am responsible for the risk of using the Software. Unless required by applicable law or agreed upon in writing, the Software is distributed with no warranties or conditions of any kind, either express or implied. 
	<br/>
	<br/>
	<b>6. Entire Agreement.</b> This is the entire agreement between the parties. It replaces any and all oral agreements between the parties, as well as any prior writings.
	<br/>
	<br/>
	<b>7. Successors and Assignees.</b> This agreement binds and benefits the heirs, successors, and assignees of the parties.
	<br/>
	<br/>
	<b>8. Notices.</b> If this agreement changes, Shadow Rule will notify you before the changes come into effect. If you do not agree to the changes, you must stop using the Software and return all confidential information to Shadow Rule. If you do not stop using the software, your use will continue under the new agreement. Shadow Rule may give notices to you in writing or by electronic mail to any e-mail address you provide to Shadow Rule.
	<br/>
	<br/>
	<b>9. Governing Law.</b> This agreement will be governed by and construed in accordance with the laws of the state of Arizona.
	<br/>
	<br/>
	<b>10. Waiver.</b> If one party waives any term or provision of this agreement at any time, that waiver will only be effective for the specific instance and specific purpose for which the waiver was given. If either party fails to exercise or delays exercising any of its rights or remedies under this agreement, that party retains the right to enforce that term or provision at a later time.
	<br/>
	<br/>
	<b>11. Severability.</b> If any court determines that any provision of this lease is invalid or unenforceable, any invalidity or unenforceability will affect only that provision and will not make any other provision of this lease invalid or unenforceable and shall be modified, amended, or limited only to the extent necessary to render it valid and enforceable.
	<br/>
	<br/>
	By checking the box below I agree to the terms and conditions detailed above. 
</div>

	<?php echo form_open("download/index");?>
		<p>
		By checking the box below I agree to the terms and conditions detailed above.
		</p>
        <div class="form-field">
            <div class="form-label"></div>
            <div class="form-input">
                <input type="checkbox" name="agree" value="<?= set_value('agree') ?>" />
                <input type="submit" value="Download" />
            </div>
        </div>
    <?php echo form_close();?>