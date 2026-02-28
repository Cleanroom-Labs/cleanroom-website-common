Dashboard Overview
==================

This page contains representative dashboard widgets for theme testing:
needflow diagrams, needtable tables, and needpie charts.

Requirement Flow
----------------

.. needflow::
   :filter: type == 'req'

Requirement Table
-----------------

.. needtable::
   :types: req
   :style: table

Status Distribution
-------------------

.. needpie:: Requirement Status
   :labels: approved, in_progress, open

   type == 'req' and status == 'approved'
   type == 'req' and status == 'in_progress'
   type == 'req' and status == 'open'
