Getting Started Guide
=====================

This page contains representative RST content for theme testing: headings,
code blocks, tables, admonitions, and inline formatting.

Introduction
------------

This guide demonstrates the rendering of standard reStructuredText content
within the Cleanroom Labs Sphinx theme.  It covers common documentation
patterns used across all projects.

Code Examples
-------------

Python example:

.. code-block:: python

   def transfer_file(source: str, dest: str) -> bool:
       """Transfer a file across an air-gap boundary."""
       with open(source, 'rb') as f:
           data = f.read()
       with open(dest, 'wb') as f:
           f.write(data)
       return True

Shell example:

.. code-block:: bash

   # Pack files for transfer
   airgap-transfer pack ./data /media/usb --chunk-size 1G

Data Table
----------

+------------------+----------+---------+
| Component        | Status   | Version |
+==================+==========+=========+
| Chunker          | Complete | 1.0     |
+------------------+----------+---------+
| Verifier         | Complete | 1.0     |
+------------------+----------+---------+
| Manifest Manager | Complete | 1.0     |
+------------------+----------+---------+
| USB Detection    | Planned  | 1.1     |
+------------------+----------+---------+

Admonitions
-----------

.. note::

   This is a note admonition.  It provides supplementary information
   that is helpful but not critical.

.. warning::

   This is a warning admonition.  It highlights important caveats or
   potential pitfalls.

.. tip::

   This is a tip admonition.  It offers practical advice for users.

Inline Formatting
-----------------

This paragraph demonstrates **bold text**, *italic text*, ``inline code``,
and a `hyperlink <https://example.com>`_.  The theme should render all of
these consistently across viewport sizes.

Nested Lists
------------

1. First level item

   a. Second level item
   b. Another second level item

      - Third level bullet
      - Another third level bullet

2. Another first level item

   - Mixed bullet under numbered list
   - Another bullet
