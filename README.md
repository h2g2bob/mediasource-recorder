MediaSource Recorder
====================

Records HTML5 video being sent using the MediaSource APIs


What's missing
--------------

- There is no user interface
- Each chunk is recorded in its own file (each SourceBuffer should keep appending onto one file)
- We don't use a reasonable file extension
- Hard-coded use of /tmp/ (ie: Linux only)



Security model
--------------

While active, any web page can write arbitary binary data to a file on disk. Mitigations / discussion:

- The filename is unguessable, which prevents an attacker attempting to write code and execute it.
- Files are only written to /tmp, which prevents an attacker from corrupting existing files.
- An attacker is able to use all the disk space (or inodes) causing a possible DoS.
