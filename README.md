# MusiQ!

An online jukebox.

## Notes
### Changes to Base
 * had to remove a couple users.allow & users.deny conditions, to allow some changes to user
 * had to remove browser-policy package to allow youtube player to play in an iframe
  * note, ulitmately better to keep / use browser-policy package, and just adjust settings to allow iframe and scripts (read docs. also there is a meteor chef snippet on it, and David Weldon blog too)

### Other Changes
* tried upgrading to Meteor 1.3 to use modules for testing. But Heroku didn't support 1.3, so reverted back to 1.2.1 for now
  * had a helluva time reverting back a version. git wasn't recognizing the files changes. was stating all files up to date. had to fool around with git reset, revert, pull. then finally had to manually update the meteor version/release/.finished-upgraders/package files.

## based on boilerplate -> The Meteor Chef - Base
A starting point for Meteor apps.

<table>
  <tbody>
    <tr>
      <th>Base Version</th>
      <td>v3.3.0 - modified</td>
    </tr>
    <tr>
      <th>Meteor Version</th>
      <td>v1.2.1</td>
    </tr>
  </tbody>
</table>

[Read the Documentation](http://themeteorchef.com/base)

