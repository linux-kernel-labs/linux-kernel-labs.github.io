=====================
File System Internals
=====================

`View slides <fs-slides.html>`_

.. slideconf::
   :autoslides: False
   :theme: single-level


Contents
========

.. slide:: File System Internals
   :inline-contents: True
   :level: 2

   * File System Software Stack

   * VFS Basics

   * Operations with Files

   * Internals: Caches and Operations Structures


File System Software Stack
==========================

TODO

.. slide:: Overview of File System Software Stack
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Disks and Partitions
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Sectors and Blocks
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Block Device Driver
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Block I/O Layer
   :inline-contents: False
   :level: 2

   * also named "I/O Subsystem", "I/O Manager"

   * I/O schedulers

TODO

.. slide:: Block I/O Structures
   :inline-contents: False
   :level: 2

   * struct bio

   * struct bvec

   * struct request

TODO

.. slide:: buffer_head
   :inline-contents: False
   :level: 2

   * old block I/O data structure

   * used by VFS and file system drivers

   * bread(), sb_bread(), brelse()

TODO

.. slide:: Virtual File System (VFS)
   :inline-contents: False
   :level: 2

   * common component in other UNIX kernels (BSD, Solaris, macOS)

   * Installable File System (IFS) on Windows

TODO

.. slide:: File System Driver (FSD)
   :inline-contents: False
   :level: 2

   * uses VFS methods and data structures

   * interprets data on disk

TODO


VFS Basics
==========

TODO

.. slide:: file and inode
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: inode in Memory and on Disk
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Fundamental Data Structures
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Filling VFS Data Structures
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Regular Files vs. Directories
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Filesystem Layout
   :inline-contents: False
   :level: 2

   * TODO

TODO


Operations with Files
=====================

TODO

.. slide:: Mount and Unmount
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Open File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Close File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Get Attributes of File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Read Data from File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Write Data to File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Create File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Remove File
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: List Directory Contents
   :inline-contents: False
   :level: 2

   * called readdir()

TODO


Internals: Caches and Operations Structures
===========================================

TODO

.. slide:: Caches
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Operations Structures
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: super_operations
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: inode_operations
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: file_operations
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: address_space_operations
   :inline-contents: False
   :level: 2

   * TODO

TODO


Conclusion
==========

TODO

.. slide:: File System Software Stack
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: Virtual File System
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: VFS Data Structures
   :inline-contents: False
   :level: 2

   * TODO

TODO

.. slide:: VFS Operations Structures
   :inline-contents: False
   :level: 2

   * TODO

TODO
