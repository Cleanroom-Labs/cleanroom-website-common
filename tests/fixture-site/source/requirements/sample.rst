Sample Requirements
===================

This page contains representative sphinx-needs requirement directives for
theme testing: needs cards, anchor targets, cross-reference links, and
responsive box containment.

Functional Requirements
-----------------------

.. req:: Transfer Data Securely
   :id: FR-TEST-001
   :status: approved
   :tags: transfer, security
   :priority: must
   :release: v1.0

   The system shall transfer data across an air-gap boundary using
   removable media while preserving data integrity.

.. req:: Verify Data Integrity
   :id: FR-TEST-002
   :status: approved
   :tags: verification, security
   :priority: must
   :release: v1.0
   :links: FR-TEST-001

   The system shall verify checksums after each transfer operation to
   ensure no corruption occurred during the process.

.. req:: Log Transfer Events
   :id: FR-TEST-003
   :status: approved
   :tags: logging, audit
   :priority: should
   :release: v1.0

   The system shall log all transfer events including timestamps, file
   sizes, and verification results for audit purposes.

.. req:: Resume Interrupted Transfers
   :id: FR-TEST-004
   :status: approved
   :tags: transfer, reliability
   :priority: must
   :release: v1.0
   :links: FR-TEST-001

   The system shall support resuming interrupted transfer operations
   from the last completed chunk.

Non-Functional Requirements
---------------------------

.. nfreq:: Memory Usage Limit
   :id: NFR-TEST-001
   :status: approved
   :tags: performance
   :priority: must
   :release: v1.0

   The system shall not consume more than 100 MB of memory during any
   transfer operation regardless of file size.
