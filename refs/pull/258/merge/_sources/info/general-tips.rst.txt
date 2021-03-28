============
General Tips
============

Your code must not only "work", but also meet certain standards.
Below are some tips for assignments, along with related penalties for non-compliance:

    -   0.2: compilation warnings
    -   0.1: 10-20 lines longer than 80 characters;
    -   0.2: more than 20 lines longer than 80 characters;
    -   0.1: duplicated code;
    -   0.1: magic numbers, not symbolic constants;
    -   0.1: identation where tabs are mixed with spaces;
    -   0.1: mixed line endings;
    -   0.1: trailing whitespace; do not leave spaces or tabs at the end of lines;
    -   0.1: long functions(> 150 de lines);
    -   0.2: very long functions (> 300 de lines);
    -   0.1: commented code; for debugging we recommend using a macro;
    -   0.1: inappropriate comments; we recommend briefly browsing the :command:`Documentation/kernel-doc-nano-HOWTO.txt` file for infomation about comment format;
    -   0.1: functions and variables used only locally that are not static;
    -   0.2: no `copy_ {to, from} _user` functions are used where needed;
    -   0.2: the return values of the functions are not checked;
    -   0.1: no relevant error codes are returned;
    -   0.2/-0.3: synchronization problems (-0.2 partial synchronizations, -0.3 synchronization mechanisms are missing or incorrect);
    -   0.1: inclusion of binary or irrelevant files in the archive;
    -   0.2: memory leaks;
    -   0.3: use of blocking operations in atomic context;

You can check most style comments using
`scripts/checkpatch.pl <git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/tree/scripts/checkpatch.pl>`__,
found in any Linux tree. For specific situations where you break the rules,
argue with a comment or specification in the README file.

Usage
-----

.. code-block:: console

    $ scripts/checkpatch.pl --no-tree --terse -f my-homework.c

For more information on coding style,
you can read the file `Coding Style <https://elixir.bootlin.com/linux/v4.19.19/source/Documentation/process/coding-style.rst>`__.