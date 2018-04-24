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

`The Linux Storage Stack <https://upload.wikimedia.org/wikipedia/commons/3/30/IO_stack_of_the_Linux_kernel.svg>`_

.. slide:: Overview of File System Software Stack
   :inline-contents: False
   :level: 2

   .. ditaa::

                           read, write, lseek, open, close
         user space
                                         +
                                         |
        +------------------------------------------------------------------------------+
                                         |
                         +---------------v------------------------------+
         kernel space    |            system call interface             |
                         +---------------+------------------------------+
                                         |
                                         |
                         +---------------v-------------+
                         |      file system driver     |
                         +------+   +--------------+   |
                         +----+ |   | +----------+ |   | +--------------+
                         |    | +---+ |          | +---+ |              |
                         |    |       |          |       |              |
                         |    +-------+          +-------+              |
                         |                                              |
                         |             Virtual File System              |
                         |                                              |
                         +---------------+------------------------------+
                                         |
                                         |
                         +---------------v------------------------------+
                         |                                              |
                         |                   block I/O layer            |
                         +------+---------------------------------------+
                                |
                                |
                         +------v------+  +-------------+
                         | block device|  |             |      ...
                         |    driver   |  |             |
                         +-------------+  +-------------+
                                |
        +------------------------------------------------------------------------------+
                                |
                                |
         hardware        +------v----------+
                         |                 |
                         |    controller   |
                         |                 |
                         +------+----------+
                                |
                                |
                         +------v----------+
                         |                 |
                         |  block device   |
                         |                 |
                         +-----------------+

TODO

.. slide:: Disks and Partitions
   :inline-contents: False
   :level: 2

   * used by block device drivers

   * disk and its partitions share major number, disk uses minor 0

   * block_device: physical device description

   * gendisk: logical device description (entry in /dev)

   * may be formatted with filesystem

TODO

.. slide:: Sectors and Blocks
   :inline-contents: False
   :level: 2

   * sectors: smallest physical addressable unit

   * block: logical addressing, multiple of sectors

   * filesystem generally uses blocks of 4K (page size)

TODO

.. slide:: Block Device Driver
   :inline-contents: False
   :level: 2

   * sends read/write command to the device controller

   * knows disk geometry, controller registers

   * gets data from block I/O layer as request or bio

TODO

.. slide:: Block I/O Layer
   :inline-contents: False
   :level: 2

   * also named "I/O Subsystem", "I/O Manager"

   * defines I/O schedulers

   * sorting and merging data from higher layer (generally filesystem)

   * sends data to block device driver in bigger chunks to improve efficiency

TODO

.. slide:: Block I/O Structures
   :inline-contents: False
   :level: 2

   * struct bio: basic I/O metadata structure (equivalent to NT kernel IRP: I/O Request Packet)

     * data sector, direction, device

     * list of bvec structures

   * struct bvec: smallest block metadata: block/page, start, length

   * struct request: array of bio structures

     * used for efficiency

     * usually sent out to block device drivers who define a reques_fn() function

TODO

.. slide:: buffer_head
   :inline-contents: False
   :level: 2

   * old block I/O data structure, maps a block (bh->b_data)

   * used by VFS and file system drivers

   * bread(), sb_bread(), brelse()

   * submit_bh() submits a buffer head, creates a bio behind the scenes

TODO

.. slide:: Virtual File System (VFS)
   :inline-contents: False
   :level: 2

   * common component in other UNIX kernels (BSD, Solaris, macOS)

   * Installable File System (IFS) on Windows

   * kernel-level framework for file system driver

   * provides data structures and implements generic methods


TODO

.. slide:: File System Driver (FSD)
   :inline-contents: False
   :level: 2

   * uses VFS methods and data structures

   * interprets data on disk

   * registers callbacks called by VFS

   * difficulty lies in knowing what is part of VFS and what needs implementing

TODO


VFS Basics
==========

TODO

.. slide:: file and inode
   :inline-contents: False
   :level: 2

   * inode is basic file metadata (at VFS level)

   * file is open file

   * file is pointed to by entry in file descriptor table (part of each process)

   * file points to inode

   * multiple files may point to one inode

TODO

.. slide:: inode in Memory and on Disk
   :inline-contents: False
   :level: 2

   * VFS inode (generic) is allocated into memory with kmalloc() or friends, and then initialized with generic data

   * disk inode (file system specific) is read into memory from disk using sb_bread()

   * data from disk inode is filled into VFS inode

   * extra data from disk inode is part of a file system specific in-memory data structure pointed to by VFS inode

TODO

.. slide:: Fundamental Data Structures
   :inline-contents: False
   :level: 2

   * inode: file medatada: type, permissions, ownership, timestamps, accounting, pointers to data blocks

   * superblock: file system metadata: filesystem magic number, file system layout, accounting

   * dentry: (name, inode) mappings

     * multiple dentries may point to same inode: hard links or simply links

TODO

.. slide:: Regular Files vs. Directories
   :inline-contents: False
   :level: 2

   * regular files: data is byte stream, no structure

   * directories: data is array of records (dentries)

   * dentries have no file system region of their own, they are part of directory data blocks

TODO

.. slide:: Filesystem Layout
   :inline-contents: False
   :level: 2

   .. figure:: /_static/fs-layout.png
      :class: fill

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
