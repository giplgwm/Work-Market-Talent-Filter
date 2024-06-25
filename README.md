# Work Market Tech Hider
A web browser extension made to hide work market techs. When toggled on it will hide the profiles of any techs who do have no completed a job for your company in the past. Configurable filters is planned to be added.

![Example Profile that would be hidden](example.png "Example Profile that would be hidden") 

**The circled field is what the extension uses to determine if a profile should be hidden. (In the 'yours' tab)**

0 = hidden. Anything else = not hidden. This value represents the total number of jobs a tech has completed for your company.

The extension reads the other values in the table (Cancelled jobs/Abandoned jobs) but currently does nothing else with them. These fields are a prime candidate for customizable filters (which will be added soon) since individuals/companies will have their own threshold for acceptable technicians.

## Installation Guide (For those who can't install through chrome web store or want to use it before its been approved there):
1. Download the [Release](https://github.com/giplgwm/Work-Market-Tech-Hider/releases/latest). Extract the folder that is inside the ZIP. This contains the extension.
2. Open Edge
3. (In edge) go to `Extensions > Manage Extensions` and enable `Developer Mode`
4. (In edge) At the top of the page press `Load unpacked` and select the folder you extracted from the Release zip file.
5. The extension should now be loaded. Tap the icon to switch between On and Off while on WorkMarket.
