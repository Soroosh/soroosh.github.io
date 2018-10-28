---
layout: post
title:  "Partition Problems"
date:   2013-10-16 07:59:02 +0200
categories: ["The Computer Guy"]
tags: ["help yourself", "keep calm and do the right thing", partitioning, problems]
excerpt_separator: <!--more-->
---
We got a new Linux workstation in our lab and guess who had to set it up. I had to change the partitioning of the hard disk and while I was doing that I also updated the software. The software update made a reboot necessary and someone forgot to change the partition table before rebooting. That caused the system not to boot completely. In the file /etc/fstab the partitions where listed with the partition ID instead of the device name. Because the old partitions were deleted the system could not boot them. The system booted / in read only and didn’t allow to change that. So, there was no way to change fstab. It’s not important whose fault it was. We don’t want to point fingers on someone, especially not at me. Here is what I did to save the day.<!--more-->
1. Stay calm and don’t panic.
1. Open fstab with:  
   `vi /etc/fstab`  
   The file opens in read only
3. Note down the partition ID and type of the partition that is missing
4. Use fdisk to change the partition ID by typing:  
   `fdisk disk [identifier]` (e.g. /dev/sdb1)  
   `x`  
   `i`  
   `[partition ID from step 3]`  
   `w`  
5. Make sure that the partition type hasn’t change from what you have from step 3. If you have changed the type while you were partitioning the system, change it back.
6. Reboot

That should solve the problem. No data lost. Once the system boots OK you can change the fstab and than change also the partition ID if needed.

